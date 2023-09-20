const { createApp } = Vue;

createApp({
  data() {
    return {
      eventosPast: [],
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
        this.eventosPast = this.filtraEventosPast(currentDate, events);
        console.log(this.eventosPast);
        this.categoriaEventos();
        this.filtrados = this.eventosPast;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    categoriaEventos() {
      this.categoriasEventos = [
        ...new Set(this.eventosPast.map((evento) => evento.category)),
      ];
    },
    filtraEventosPast(fechaReferencia, listaEventos) {
      let eventosFiltrados = listaEventos.filter(
        (evento) => evento.date <= fechaReferencia
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
      let filtrosearch = this.filtroSearch(this.eventosPast, this.valueSearch);
      let filtrochecks = this.filtrocheck(filtrosearch, this.checked);
      this.filtrados = filtrochecks;
    },
  },
}).mount("#app");
