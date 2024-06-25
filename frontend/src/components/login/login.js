import { useDispatch } from "react-redux";
import { login } from "../../Redux_Store/authSlice";
import { useNavigate } from "react-router-dom";
import serverport from "../../backendconfiguration";
import useFormValidation from "../../Hooks/use_fromvalidation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = { value: "", valid: true };
  const password = { value: "", valid: true };
  const {
    formState,
    errors,
    handleInputChange,
    HandleAuthError,
    resetErrors,
    getErrorMsg,
  } = useFormValidation({ username, password });
  const HandleGuestLogin = () => {
    navigate("/home");
  };
  const usererror = getErrorMsg("username");
  const passerror = getErrorMsg("password");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverport}/users/authenticateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.username.value,
            password: formState.password.value,
          }),
        }
      );

      if (!response.ok) {
        const { usererror, passerror } = await response.json();
        // Handle authentication failure, show error message, etc.
        console.error("Authentication failed", usererror, passerror);
        if (usererror) HandleAuthError("username", usererror);
        else HandleAuthError("password", passerror);
        return;
      }

      const { token } = await response.json();
      console.log(token);

      dispatch(
        login({
          username,
          role: "admin",
          token,
        })
      );

      navigate("/home");
    } catch (error) {
      console.error("Error during login", error);
      // Handle other errors
    }
  };

  return (
    <>
      <h1 className="text-center m-5" style={{ fontWeight: "300" }}>
        منظومة الكانتين
      </h1>
      <div className="mb-5 add-container" dir="rtl">
        <p
          style={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: "300",
          }}
        >
          تسجيل الدخول
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="username" className="label">
            اسم المستخدم:
          </label>
          <input
            className={`form-control input `}
            type="text"
            name="username"
            id="username"
            value={formState.username.value}
            onChange={(event) => {
              handleInputChange(event);
              resetErrors(event.target.name);
            }}
          />
          {usererror && <p className="text-danger"> username is incorrect</p>}
          <br />
          <label htmlFor="password" className="label">
            كلمة السر :
          </label>
          <input
            className={`form-control input `}
            type="password"
            id="password"
            name="password"
            value={formState.password.value}
            onChange={(event) => {
              handleInputChange(event);
              resetErrors(event.target.name);
            }}
          />
          {passerror && <p className="text-danger"> password is incorrect</p>}
          <br />
          <div>
            <button type="submit" className="btn btn-primary add-btn ms-1">
              دخول مستخدم
            </button>
            <button
              type="button"
              className="btn btn-primary add-btn"
              onClick={HandleGuestLogin}
            >
              دخول كزائر
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
