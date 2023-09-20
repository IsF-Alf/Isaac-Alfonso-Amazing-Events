const { createApp } = Vue;

createApp({
  data() {
    return {
      eventos: [],
      valueSearch: ``,
      filtrados: [],
      categoriasEventos: [],
      checked: [],
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then((respuesta) => respuesta.json())
      .then(({ events }) => {
        this.eventos = events;
        console.log(this.eventos);
        this.categoriaEventos();
        this.filtrados = this.eventos;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    categoriaEventos() {
      this.categoriasEventos = [
        ...new Set(this.eventos.map((evento) => evento.category)),
      ];
    },
    filtroSearch(array, inputValue) {
      return array.filter((evento) =>
        evento.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    filtrocheck(array, categorias) {
      return array.filter(
        (evento) =>
          categorias.includes(evento.category) || categorias.length == 0
      );
    },
    filtroCheckSearch() {
      let filtrosearch = this.filtroSearch(this.eventos, this.valueSearch);
      let filtrochecks = this.filtrocheck(filtrosearch, this.checked);
      this.filtrados = filtrochecks;
    },
  },
}).mount("#app");
