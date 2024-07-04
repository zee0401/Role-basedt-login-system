import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const routes = [
    "labs",
    "management",
    "project",
    "test",
    "createuser",
    "settings",
  ];

  const toggleRoute = (route) => {
    if (selectedRoutes.includes(route)) {
      setSelectedRoutes(selectedRoutes.filter((r) => r !== route));
    } else {
      setSelectedRoutes([...selectedRoutes, route]);
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, phoneno } = data;

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the newly created user
      const user = userCredential?.user;

      if (!user) {
        throw new Error("User creation failed.");
      }

      // Sign out the user immediately after creation (if still signed in)
      await signOut(auth);

      // Store user data in Firestore
      const userRef = collection(firestore, "users");
      await addDoc(userRef, {
        uid: user.uid,
        name,
        email: user.email,
        phoneno,
        routes: selectedRoutes, // Include selected routes here
        createdAt: serverTimestamp(),
      });

      // Reset form fields and selected routes
      reset({
        name: "",
        email: "",
        phoneno: "",
        password: "",
      });

      setSelectedRoutes([]);

      // Provide feedback to the user (optional)
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle error and provide feedback to the user (optional)
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create User</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter name"
                      {...register("name", { required: true, maxLength: 80 })}
                    />
                    {errors.name && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="inputPhoneno" className="form-label">
                      Phone no
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputPhoneno"
                      placeholder="Enter Phone no"
                      {...register("phoneno", { required: true })}
                    />
                    {errors.phoneno && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Enter email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Authorized Routes</label>
                  <div className="btn-group" role="group">
                    {routes.map((route) => (
                      <button
                        key={route}
                        type="button"
                        className={`btn mx-1 ${
                          selectedRoutes.includes(route)
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => toggleRoute(route)}
                      >
                        {route}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-success">
                  Create User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
