const { createApp } = Vue;

createApp({
  data() {
    return {
      eventos: [],
      eventoDetalle:``,
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then((respuesta) => respuesta.json())
      .then(({ events }) => {
        this.eventos = events;
        console.log(this.eventos);
        let parametro = location.search;
        let params = new URLSearchParams(parametro);
        let idEvento = params.get("parametro");
        this.eventoDetalle = this.eventos.find(
          (evento) => (evento._id == idEvento)
        );
        console.log(this.eventoDetalle)
      })
      .catch((err) => console.log(err));
  },
  methods: {},
}).mount("#app");
