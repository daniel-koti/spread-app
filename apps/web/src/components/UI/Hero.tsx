export function Hero() {
  return (
    <section className="my-4">
      <div
        className="w-full h-[480px] bg-center bg-cover bg-no-repeat rounded-md p-8 flex gap-4 flex-col justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560297035-0ed84c4175f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80')",
        }}
      >
        <h1 className="text-white font-semibold text-4xl w-96">
          Viva experiências únicas nos eventos mais incríveis 🥳
        </h1>
        <p className="w-96 text-slate-900">
          Desde shows, festivais, exposições e muito mais, tudo em um só lugar.
          Encontre seu próximo evento favorito e viva momentos inesquecíveis com
          amigos e familiares. Não perca mais tempo, comece a explorar agora
          mesmo!
        </p>
      </div>
    </section>
  )
}
