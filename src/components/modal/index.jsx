import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { formatarCep, formatarCpf, formatarData } from "../../helpers/format";
import * as FireBaseStorage from "firebase/storage";
import { storage } from "../../services";
import { get, getDatabase, ref, set } from "firebase/database";

function ModalEmployees({
  showModal,
  setShowModal,
  setListEmployees,
  setLoading,
}) {
  const [img, setImg] = useState("");
  const [getEmployees, setGetEmployees] = useState(true);
  const cepInputRef = useRef(null);
  const optionsStatus = ["Inativo", "Ativo"];

  const [values, setValues] = useState({
    id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    imageName: "",
    image: "",
    name: "",
    email: "",
    cpf: "",
    hiringDate: "",
    cep: "",
    neighborhood: "",
    street: "",
    city: "",
    state: "",
    active: "",
  });

  useEffect(() => {
    if (values?.cep?.length === 9) {
      buscarCEP();
    }
  }, [values?.cep]);

  useEffect(() => {
    if (getEmployees) {
      setLoading(true);
      getData()
        .then((res) => {
          if (res !== null) {
            setListEmployees(res);
            setLoading(false);
            setGetEmployees(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Erro ao obter os funcionários:", error);
        });
    }
  }, [getEmployees]);

  const toggle = () => {
    setValues({});
    setImg("");
    setShowModal(!showModal);
  };

  const handleChangeCep = (e) => {
    const _value = e.target.value;
    const _valueFormated = formatarCep(_value);
    setValues({ ...values, cep: _valueFormated });
  };

  const handleChangeCpf = (e) => {
    const _value = e.target.value;
    const _valueFormated = formatarCpf(_value);
    setValues({ ...values, cpf: _valueFormated });
  };

  const handleChangeData = (e) => {
    const _value = e.target.value;
    const _valueFormated = formatarData(_value);
    setValues({ ...values, hiringDate: _valueFormated });
  };

  async function getData() {
    const db = getDatabase();
    const dataRef = ref(db, "employees");

    try {
      const res = await get(dataRef);
      return res.val();
    } catch {
      return null;
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    if (img === "") {
      toast.warn("Selecione a imagem do produto!");
      return;
    }

    if (img) {
      const file = img;
      if (!file) return;
      const storageRef = FireBaseStorage.ref(
        storage,
        `files/${values?.imageName}`
      );
      const uploadTask = FireBaseStorage.uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", () => {
        FireBaseStorage.getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onSave(url);
        });
      });
    } else {
      onSave(img);
    }
  }

  async function onSave(img) {
    const newValues = { ...values, image: img };
    setValues(newValues);

    const db = getDatabase();
    const dataRef = ref(db, "employees");

    try {
      const snapshot = await get(dataRef);
      const existingData = snapshot.exists() ? snapshot.val() : [];
      const updatedList = [...existingData, newValues];

      await set(dataRef, updatedList);
      setListEmployees(updatedList);
      setValues({});
      setImg("");
      setShowModal(!showModal);
      toast.success("Funcionário cadastrado com sucesso!");
    } catch (error) {
      toast.error("Houve um erro ao cadastrar o funcionário!");
    }
  }

  function buscarCEP() {
    if (values?.cep) {
      const validaCEP = /^[0-9]{8}$|^[0-9]{5}-[0-9]{3}$/;
      if (validaCEP.test(values?.cep)) {
        const _cep = values?.cep.replace(/\D/g, "");
        const urlAPI = `https://viacep.com.br/ws/${_cep}/json/`;

        fetch(urlAPI)
          .then((response) => {
            if (!response.ok) {
              toast.error(`Erro na requisição: ${response.status}`);
            }
            return response.text();
          })
          .then((data) => {
            const cleanResponse = data.replace(/\n/g, "").replace(/\\/g, "");
            const dados = JSON.parse(cleanResponse);
            setValues({
              ...values,
              neighborhood: dados.bairro,
              city: dados.localidade,
              street: dados.logradouro,
              state: dados.uf,
            });
          });
      } else {
        toast.error("Formato do CEP inválido!");
        cepInputRef.current.focus();
      }
    }
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        toggle={toggle}
        centered={true}
        className="modal-employees"
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <ModalHeader>
            <i className="pi pi-user-plus" /> Adicionar funcionário
          </ModalHeader>
          <ModalBody>
            <div className="row mb-3">
              <div
                className={
                  img ? "col-lg-10 col-md-10 p-2" : "col-lg-12 col-md-12 p-2"
                }
              >
                <FileUpload
                  className="btn-upload"
                  mode="basic"
                  accept="image/*"
                  maxFileSize={1000000}
                  chooseLabel="Escolha uma imagem"
                  onSelect={(e) => {
                    setImg(e.files[0]);
                    const id = new Date().getTime() % 10000;
                    const extension = e.files[0].name.split(".").pop();
                    const fileName = `${e.files[0].name
                      .split(".")
                      .slice(0, -1)
                      .join(".")}-${id}.${extension}`;
                    setValues({
                      ...values,
                      imageName: fileName,
                      image: e.files[0].objectURL,
                    });
                  }}
                />
              </div>
              {img ? (
                <div className="col-lg-2 col-md-2 p-2">
                  <img
                    src={img?.objectURL || img}
                    alt="img-produto"
                    className="img-produto"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                    <label>Nome</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                    <label>E-mail</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.cpf}
                      onChange={handleChangeCpf}
                    />
                    <label>CPF</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.hiringDate}
                      onChange={handleChangeData}
                    />
                    <label>Data de contratação</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.cep}
                      ref={cepInputRef}
                      onChange={handleChangeCep}
                    />
                    <label>CEP</label>
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.neighborhood}
                      onChange={(e) =>
                        setValues({ ...values, neighborhood: e.target.value })
                      }
                    />
                    <label>Bairro</label>
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.street}
                      onChange={(e) =>
                        setValues({ ...values, street: e.target.value })
                      }
                    />
                    <label>Rua</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.city}
                      onChange={(e) =>
                        setValues({ ...values, city: e.target.value })
                      }
                    />
                    <label>Cidade</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      required
                      className="input-form w-100"
                      value={values.state}
                      onChange={(e) =>
                        setValues({ ...values, state: e.target.value })
                      }
                    />
                    <label>Estado</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-3 active">
              <div className="col-12">
                <SelectButton
                  value={values.active}
                  onChange={(e) => {
                    setValues({ ...values, active: e.value });
                  }}
                  options={optionsStatus}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-save" type="submit">
              <i className="pi pi-save" /> Salvar
            </Button>
            <Button className="btn-closed" onClick={toggle}>
              <i className="pi pi-times" /> Fechar
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default ModalEmployees;
