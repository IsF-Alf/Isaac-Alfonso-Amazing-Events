const { createApp } = Vue;

createApp({
  data() {
    return {
      eventosUp: [],
      valueSearch: ``,
      filtrados: [],
      categoriasEventos: [],
      checked: [],
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then((respuesta) => respuesta.json())
      .then(({ events, currentDate }) => {
        this.eventosUp = this.filtraEventosUp(currentDate, events);
        console.log(this.eventosUp);
        this.categoriaEventos();
        this.filtrados = this.eventosUp;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    categoriaEventos() {
      this.categoriasEventos = [
        ...new Set(this.eventosUp.map((evento) => evento.category)),
      ];
    },
    filtraEventosUp(fechaReferencia, listaEventos) {
      let eventosFiltrados = listaEventos.filter(
        (evento) => evento.date >= fechaReferencia
      );
      return eventosFiltrados;
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
      let filtrosearch = this.filtroSearch(this.eventosUp, this.valueSearch);
      let filtrochecks = this.filtrocheck(filtrosearch, this.checked);
      this.filtrados = filtrochecks;
    },
  },
}).mount("#app");
