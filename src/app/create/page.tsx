"use client";

import { useState } from "react";
import { object, string, ref, ValidationError } from "yup"; 
import { useRouter } from "next/navigation";

const schema = object({
  email: string().email("E-mail inválido").required("E-mail obrigatório"),
  password: string()
    .min(4, "Mínimo 4 caracteres")
    .required("Senha obrigatória"),
  confirmPass: string()
    .oneOf([ref("password")], "As senhas não conferem")
    .required("Confirmação obrigatória"),
});

export default function Create() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosDoFormulario = {
      email,
      password,
      confirmPass,
    };

    try {
      await schema.validate(dadosDoFormulario);
      
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

    } catch (err: any) {
      if (err.name === "ValidationError") {
        
        if (err.path === "email") {
            alert("Erro no E-mail: " + err.message);
        } 
        else if (err.path === "password") {
            alert("Erro na Senha: " + err.message);
        } 
        else if (err.path === "confirmPass") {
            alert("Erro na Confirmação: " + err.message);
        }
      }
    }
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center text-green-500 text-4xl">
      <div className="border-2 border-white w-[100vh] h-auto p-10 rounded-4xl flex items-center flex-col">
        
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
          </div>

          <div className="w-[50vh]">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
          </div>

          <div className="w-[50vh]">
            <input
              type="password"
              placeholder="Confirme sua Senha"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
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