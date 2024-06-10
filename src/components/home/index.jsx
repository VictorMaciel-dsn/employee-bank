import { Badge, Button, Card } from "reactstrap";
import imgLogo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ModalEmployees from "../modal";
import { FilterMatchMode } from "primereact/api";

function HomePage() {
  const navigate = useNavigate();
  const [listEmployees, setListEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const filters = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cpf: { value: null, matchMode: FilterMatchMode.CONTAINS },
    hiringDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    active: { value: null, matchMode: FilterMatchMode.CONTAINS },
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

  return (
    <>
      <ModalEmployees
        showModal={showModal}
        setShowModal={setShowModal}
        setListEmployees={setListEmployees}
      />
      <div className="home-page">
        <div className="nav-bar">
          <img src={imgLogo} alt="logo" className="logo-nav" />
          <Button
            className="btn-sign-out"
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="pi pi-sign-out" />
          </Button>
        </div>
        <Card>
          <DataTable
            value={listEmployees}
            header={header}
            paginator
            rows={15}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={[
              "name",
              "email",
              "cpf",
              "hiringDate",
              "active",
            ]}
            dataKey="id"
            emptyMessage="Nenhum funcionário cadastrado!"
          >
            <Column field="image" header="Imagem" body={(e) => imgBody(e)} />
            <Column
              filter
              showFilterMenu={false}
              filterPlaceholder="Por nome"
              field="name"
              header="Nome"
            />
            <Column
              filter
              showFilterMenu={false}
              filterPlaceholder="Por e-mail"
              field="email"
              header="E-mail"
            />
            <Column
              filter
              showFilterMenu={false}
              filterPlaceholder="Por CPF"
              field="cpf"
              header="CPF"
            />
            <Column
              filter
              showFilterMenu={false}
              filterPlaceholder="Por data"
              field="hiringDate"
              header="Data de contratação"
            />
            <Column
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
