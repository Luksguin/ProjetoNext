"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

//validacao de campo
const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .min(4, "Mínimo 4 caracteres")
    .required("Senha obrigatória"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não conferem")
    .required("Confirmação obrigatória"),
});

type FormData = yup.InferType<typeof schema>;

export default function Create() {
  const router = useRouter();

  // Configuração do React Hook Form com Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  //pra mandar pra salvar
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        router.push("/login"); // te manda pra tela de login depois de criar o usuário
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 w-full flex-col items-center"
        >
          <div className="w-[50vh]">
            <input
              type="text"
              placeholder="E-mail"
              {...register("email")}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
            <p className="text-red-500 text-sm mt-1 pl-2">
              {errors.email?.message}
            </p>
          </div>

          <div className="w-[50vh]">
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
            <p className="text-red-500 text-sm mt-1 pl-2">
              {errors.password?.message}
            </p>
          </div>

          <div className="w-[50vh]">
            <input
              type="password"
              placeholder="Confirme sua Senha"
              {...register("confirmPass")}
              className="w-full bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4"
            />
            <p className="text-red-500 text-sm mt-1 pl-2">
              {errors.confirmPass?.message}
            </p>
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
