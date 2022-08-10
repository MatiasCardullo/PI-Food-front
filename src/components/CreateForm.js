import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRecipe, getTypesOfDiets } from "../actions";
import { Link } from "react-router-dom";
import s from "../styles/CreateForm.module.css";

const validateForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!form.title.trim()) {
    errors.title = "This field is required";
  }

  if (typeof form.title.trim() !== "undefined") {
    if (!regexName.test(form.title.trim())) {
      errors.title = "This field only accept letters";
    }
  }

  if (typeof form.summary.trim() !== "undefined") {
    if (!regexName.test(form.summary.trim())) {
      errors.summary = "This field only accept letters";
    }
  }

  if (parseInt(form.healthScore) < 1 || parseInt(form.healthScore) > 100) {
    errors.healthScore = "The score must be greater than 0 and less than 100";
  }

  return errors;
};

export default function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.diets);

  const [errorsForm, setErrorsForm] = useState({
    diets: "this field is required",
  });

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getTypesOfDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrorsForm(
      validateForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectRecipes = (e) => {
    if (!form.diets.includes(e.target.value))
      setForm({
        ...form,
        diets: [...new Set([...form.diets, e.target.value])],
      });
    setErrorsForm(
      validateForm({
        ...form,
        diets: [...form.diets, e.target.value],
      })
    );
  };

  const handleCreateDiet=(e)=>{
    setForm({
      ...form,
        diets: [e.target.value]
    })
    setErrorsForm(
      validateForm({
        ...form,
        diets: [e.target.value]
      })
    )
  }

  const handleDelete = (e) => {
    setForm({
      ...form,
      diets: form.diets.filter((el) => el !== e),
    });
    setErrorsForm(
      validateForm({
        ...form,
        diets: form.diets.filter((el) => el !== e),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //si hay errores no enviar
    if (Object.keys(errorsForm).length !== 0) {
      alert("The recipe cannot be created with the supplied data ");
    } else {
      e.preventDefault();
      dispatch(postRecipe(form));
      alert("Your recipe has been created succesfully");
      navigate("/recipes");
      setForm({
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
      });
    }
  };
  
  console.log(form.diets);

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p className={s.title}>CREATE YOUR OWN RECIPE</p>
        </div>

        <div>
          <p className={s.pTitle}>Title *</p>
          <input
            type="text"
            name="title"
            value={form.title}
            className={s.input}
            onChange={(e) => handleChange(e)}
          />

          {errorsForm.title ? (
            <h6 className={s.error}>{errorsForm.title}</h6>
          ) : (
            false
          )}
        </div>

        <div>
          <p className={s.pTitle}>Summary *</p>
          <input
            className={s.input}
            type="text"
            name="summary"
            value={form.summary}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.summary ? (
            <h6 className={s.error}>{errorsForm.summary}</h6>
          ) : (
            false
          )}
        </div>

        <div>
          <p className={s.pTitle}>Score *</p>
          <input
            type="number"
            name="healthScore"
            min={1}
            max={100}
            className={s.input}
            value={form.healthScore}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.healthScore ? (
            <h6 className={s.error}>{errorsForm.healthScore}</h6>
          ) : (
            false
          )}
        </div>


        <div>
          <p>Create Diet</p>
          <input
            type="text"
            name='diets'
            placeholder="insert your own diet"
            // value={form.diets}
            onChange={(e) => handleCreateDiet(e)}
            />
        </div>




        <div>
          <p className={s.pTitle}>Instructions *</p>
          <textarea
            type="text"
            name="steps"
            value={form.steps}
            cols="30"
            rows="10"
            className={s.inputText}
            onChange={(e) => handleChange(e)}
          />

          {errorsForm.steps ? (
            <h6 className={s.error}>{errorsForm.steps}</h6>
          ) : (
            false
          )}
        </div>

        <div>
          <p className={s.pTitle}>Type of diets * </p>

          <select
            className={s.sForm}
            onChange={(e) => handleSelectRecipes(e)}
            defaultValue="default"
          >
            <option value="default" disabled>
              All
            </option>
            {diets &&
              diets.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
          </select>

          {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false}
        </div>

        <div className={s.selectDiet}>
          {form.diets.map((diet) => (
            <div>
              <input
                key={diet}
                type="button"
                value="X"
                className={s.selectX}
                // onBlur={handleBlur}
                onClick={() => handleDelete(diet)}
              />
              <p>{diet}</p>
            </div>
          ))}
          {/* {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false} */}
        </div>

        <div>
          <button
            className={s.buttonSend}
            type="submit"
            name="submit"
            disabled={Object.keys(errorsForm).length === 0 ? false : true}
          >SEND
          </button>
        </div>
      </form>

      <div>
        <Link to="/recipes">
          <button className={s.button}>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
