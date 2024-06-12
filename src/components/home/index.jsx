import { Badge, Button, Card } from "reactstrap";
import imgLogo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ModalEmployees from "../modal";
import { FilterMatchMode } from "primereact/api";
import { signOut } from "firebase/auth";
import { auth } from "../../services";
import { toast } from "react-toastify";

function HomePage() {
  const navigate = useNavigate();
  const [listEmployees, setListEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cpf: { value: null, matchMode: FilterMatchMode.CONTAINS },
    hiringDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cep: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.CONTAINS },
    neighborhood: { value: null, matchMode: FilterMatchMode.CONTAINS },
    state: { value: null, matchMode: FilterMatchMode.CONTAINS },
    street: { value: null, matchMode: FilterMatchMode.CONTAINS },
    active: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const header = () => {
    return (
      <>
        <p>Funcionários</p>
        <Button
          className="btn-add"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <i className="pi pi-plus" /> Adicionar funcionário
        </Button>
      </>
    );
  };

  const footer = () => {
    return (
      <div className="footer-table">
        Total de funcionários: {listEmployees?.length}
      </div>
    );
  };

  const imgBody = (item) => {
    return (
      <>
        <img src={item?.image} alt="img" className="img-grid" />
      </>
    );
  };

  const statusBody = (item) => {
    return (
      <>
        <Badge className={item?.active === "Ativo" ? "active" : "inactive"}>
          {item?.active}
        </Badge>
      </>
    );
  };

  function logout() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast.error("Houve um erro ao se desconectar!");
      });
  }

  return (
    <>
      <ModalEmployees
        showModal={showModal}
        setShowModal={setShowModal}
        setListEmployees={setListEmployees}
        setLoading={setLoading}
      />
      <div className="home-page">
        <div className="nav-bar">
          <img src={imgLogo} alt="logo" className="logo-nav" />
          <Button
            className="btn-sign-out"
            onClick={() => {
              logout();
            }}
          >
            <i className="pi pi-sign-out" />
          </Button>
        </div>
        <Card>
          <DataTable
            value={listEmployees}
            loading={loading}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            header={header}
            footer={footer}
            paginator
            rows={15}
            lazy={false}
            filterDisplay="row"
            dataKey="id"
            emptyMessage="Nenhum funcionário cadastrado!"
            reorderableColumns
          >
            <Column field="image" header="Imagem" body={(e) => imgBody(e)} />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por nome"
              field="name"
              header="Nome"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por e-mail"
              field="email"
              header="E-mail"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por CPF"
              field="cpf"
              header="CPF"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por data"
              field="hiringDate"
              header="Data de contratação"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por CEP"
              field="cep"
              header="CEP"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por cidade"
              field="city"
              header="Cidade"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por estado"
              field="state"
              header="Estado"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por bairro"
              field="neighborhood"
              header="Bairro"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por rua"
              field="street"
              header="Rua"
            />
            <Column
              sortable
              filter
              showFilterMenu={false}
              filterPlaceholder="Por status"
              field="active"
              header="Status"
              body={(e) => statusBody(e)}
            />
          </DataTable>
        </Card>
      </div>
    </>
  );
}

export default HomePage;
