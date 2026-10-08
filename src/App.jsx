import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    city: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Inputların dəyərini dəyişmək
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Checkbox üçün
  function handleCheckbox(e) {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, value],
      });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter(
          (interest) => interest !== value
        ),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Ad yoxlaması
    if (formData.name.trim() === "") {
      newErrors.name = "Ad daxil edin";
    }

    // Email yoxlaması
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      formData.email.trim() === "" ||
      !emailRegex.test(formData.email)
    ) {
      newErrors.email = "Düzgün email daxil edin";
    }

    // Şifrə yoxlaması
    if (formData.password.length < 6) {
      newErrors.password = "Şifrə ən azı 6 simvol olmalıdır";
    }

    // Cins yoxlaması
    if (formData.gender === "") {
      newErrors.gender = "Cins seçin";
    }

    // Checkbox yoxlaması
    if (formData.interests.length === 0) {
      newErrors.interests = "Ən azı bir seçim edin";
    }

    // Şəhər yoxlaması
    if (formData.city === "") {
      newErrors.city = "Şəhər seçin";
    }

    setErrors(newErrors);

    // Əgər xəta varsa
    if (Object.keys(newErrors).length > 0) {
      setSuccess(false);
      return;
    }

  
    console.log("Qeydiyyat məlumatları:");
    console.log(formData);

    console.log("Qeydiyyat uğurludur!");

    setSuccess(true);

    // Formu təmizlemek
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      interests: [],
      city: "",
      note: "",
    });
  }

  return (
    <div className="page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Qeydiyyat Formu</h1>

        {/* Ad */}
        <div className="form-row">
          <label>Ad</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Adınızı daxil edin"
          />

          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-row">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email daxil edin"
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        {/* Şifrə */}
        <div className="form-row">
          <label>Şifrə</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifrənizi daxil edin"
          />

          {errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>

        {/* Cins */}
        <div className="form-row">
          <label>Cins</label>

          <div className="options">
            <label className="option">
              <input
                type="radio"
                name="gender"
                value="Kişi"
                checked={formData.gender === "Kişi"}
                onChange={handleChange}
              />
              Kişi
            </label>

            <label className="option">
              <input
                type="radio"
                name="gender"
                value="Qadın"
                checked={formData.gender === "Qadın"}
                onChange={handleChange}
              />
              Qadın
            </label>
          </div>

          {errors.gender && (
            <p className="error">{errors.gender}</p>
          )}
        </div>

        {/* Maraq dairələri */}
        <div className="form-row">
          <label>Maraq dairələri</label>

          <div className="options">
            <label className="option">
              <input
                type="checkbox"
                value="Frontend"
                checked={formData.interests.includes("Frontend")}
                onChange={handleCheckbox}
              />
              Frontend
            </label>

            <label className="option">
              <input
                type="checkbox"
                value="Backend"
                checked={formData.interests.includes("Backend")}
                onChange={handleCheckbox}
              />
              Backend
            </label>

            <label className="option">
              <input
                type="checkbox"
                value="Sport"
                checked={formData.interests.includes("Sport")}
                onChange={handleCheckbox}
              />
              Sport
            </label>

          <label className="option">
              <input
                type="checkbox"
                value="Reading"
                checked={formData.interests.includes("Reading")}
                onChange={handleCheckbox}
              />
              Reading
            </label>

            <label className="option">
              <input
                type="checkbox"
                value="Poetry"
                checked={formData.interests.includes("Poetry")}
                onChange={handleCheckbox}
              />
             Poetry
            </label>


          </div>

          {errors.interests && (
            <p className="error">{errors.interests}</p>
          )}
        </div>

        {/* Şəhər */}
        <div className="form-row">
          <label>Şəhər</label>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Şəhər seçin</option>
            <option value="Bakı">Bakı</option>
            <option value="Lənkəran">Lənkəran</option>
            <option value="Gəncə">Gəncə</option>
            <option value="Sumqayıt">Sumqayıt</option>
          </select>

          {errors.city && (
            <p className="error">{errors.city}</p>
          )}
        </div>

        {/* Qeyd */}
        <div className="form-row">
          <label>Qeyd</label>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Qeydinizi yazın..."
            rows="4"
          ></textarea>
        </div>

        {/* Düymə */}
        <button type="submit">Göndər</button>

        {/* Uğur mesajı */}
        {success && (
          <p className="success">
            Form uğurla göndərildi!
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
























// function App() {
// let value = 0;

//   const increment = ()=>{
//       value++;
//       console.log(value);
      
//      }

//     return (
//     // <div>
//     // <div>html</div>
//     // <div>css</div>
//     // <div>js</div> // hamisini bir teqin icinde yazmaliyiq ki, xeta vermesin
//     // </div>
//      <>

   
// <p>{value}</p>
// <button onClick={increment}>+</button>
//     </> // ve ya fraqmentin icinde yaza bilerik- elemets den gore bilerik ki,bele yazanda ayrica divin icinde olmurlar
//   );
// }
// export default App;















// > npm run build

// PS D:\react> cd .\Reaksiya\
// PS D:\react\Reaksiya> npm run dev

// > reaksiya@0.0.0 dev
// > vite


//   VITE v8.3.3  ready in 341 ms

//   ➜  Local:   http://localhost:5173/
//   ➜  Network: use --host to expose
//   ➜  press h + enter to show help





