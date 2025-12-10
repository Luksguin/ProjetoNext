"use client";

import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

//padrao para validacao
const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .min(4, "Mínimo 4 caracteres")
    .required("Senha obrigatória"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não conferem") // funcao para ver se as senhas sao iguais
    .required("Confirmação obrigatória"),
});

export default function Create() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  
  // todos os erros
  const [errors, setErrors] = useState<any>({}); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // objeto para validacao do yup
    const dadosDoFormulario = {
      email,
      password,
      confirmPass,
    };

    try {
      // Tenta validar com Yup
      await schema.validate(dadosDoFormulario, { abortEarly: false });
      
      // se passou reseta os erros
      setErrors({});

      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        router.push("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }

    } catch (err) {
      // Se o schema.validate der erro, ele cai aqui
      if (err instanceof yup.ValidationError) {
        const validationErrors: any = {};
        
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center text-green-500 text-4xl">
      <div className="border-2 border-white w-[100vh] h-auto p-10 rounded-4xl flex items-center flex-col">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png"
          alt="Spotify Logo"
          className="h-[15vh] mb-10 object-contain"
        />

        <p className="mb-4 text-center">Inscreva-se em uma conta grátis</p>

        <form onSubmit={handleSubmit} className="flex gap-4 w-full flex-col items-center">
          
          <div className="w-[50vh]">
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
            {errors.email && (
                <p className="text-red-500 text-sm mt-1 pl-2">{errors.email}</p>
            )}
          </div>

          <div className="w-[50vh]">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
             {errors.password && (
                <p className="text-red-500 text-sm mt-1 pl-2">{errors.password}</p>
            )}
          </div>

          <div className="w-[50vh]">
            <input
              type="password"
              placeholder="Confirme sua Senha"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
             {errors.confirmPass && (
                <p className="text-red-500 text-sm mt-1 pl-2">{errors.confirmPass}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-4xl h-[8vh] w-[50vh] mt-4 hover:bg-white hover:text-black hover:cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}