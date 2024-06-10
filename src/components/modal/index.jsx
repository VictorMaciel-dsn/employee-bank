import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ModalEmployees({ showModal, setShowModal, setListEmployees }) {
  const [img, setImg] = useState("");
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

  const toggle = () => {
    setValues({});
    setShowModal(!showModal);
  };

  function onSubmit(e) {
    e.preventDefault();

    if (img === "") {
      toast.warn("Selecione a imagem do produto!");
      return;
    }

    console.log("Payload:", values);
    setListEmployees((x) => [...x, values]);
    setValues({});
    setShowModal(!showModal);
    toast.success("Funcionário cadastrado com sucesso!");
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
                  chooseLabel={
                    /* isEdit ? imgProdutoName :  */ "Escolha uma imagem"
                  }
                  onSelect={(e) => {
                    // if (isEdit) {
                    //   setNewImage(true);
                    // }
                    setImg(e.files[0]);
                    const id = new Date().getTime() % 10000;
                    const extension = e.files[0].name.split(".").pop();
                    const fileName = `${e.files[0].name
                      .split(".")
                      .slice(0, -1)
                      .join(".")}-${id}.${extension}`;
                    // setImgName(fileName);
                    setValues({ ...values, imageName: fileName });
                    setValues({ ...values, image: e.files[0].objectURL });
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
                      onChange={(e) =>
                        setValues({ ...values, cpf: e.target.value })
                      }
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
                      // type="date"
                      className="input-form w-100"
                      value={values.hiringDate}
                      onChange={(e) =>
                        setValues({ ...values, hiringDate: e.target.value })
                      }
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
                      onChange={(e) =>
                        setValues({ ...values, cep: e.target.value })
                      }
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
