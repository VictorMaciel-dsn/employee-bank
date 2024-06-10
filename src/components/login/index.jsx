import { Button, Card } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import imgLogo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [openEye, setOpenEye] = useState(false);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();

    if (valueEmail === "adm" && valuePassword === "123") {
      navigate("/home");
    } else {
      toast.error("Usuário ou senha inválidos!");
    }
  }

  return (
    <>
      <div className="login-page">
        <img src={imgLogo} alt="logo" className="img-logo" />
        <Card>
          <form onSubmit={(e) => login(e)}>
            <div className="form-group">
              <span className="p-float-label">
                <InputText
                  required
                  className="input-form"
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                />
                <label>E-mail</label>
              </span>
            </div>
            <div className="form-group">
              <span className="p-float-label">
                <InputText
                  required
                  className="input-form"
                  type={openEye ? "text" : "password"}
                  value={valuePassword}
                  onChange={(e) => setValuePassword(e.target.value)}
                />
                {openEye ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => setOpenEye(!openEye)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => setOpenEye(!openEye)}
                  />
                )}
                <label>Senha</label>
              </span>
            </div>
            <Button className="btn-login" type="submit">
              Acessar
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
