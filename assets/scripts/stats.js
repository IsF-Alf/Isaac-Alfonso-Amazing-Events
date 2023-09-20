const { createApp } = Vue;

createApp({
  data() {
    return {
      eventos: [],
      eventoConMayorPorcentaje: {},
      eventoConMenorPorcentaje: {},
      eventoConMayorCapacidad: {},
      arrayObjUp:[],
      arrayObjPast:[],
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then((respuesta) => respuesta.json())
      .then(({ events, currentDate }) => {
        this.eventos = events;
        console.log(this.eventos);
        let porcentajes = this.porcentajeAsist(this.eventos, currentDate);
        this.eventoConMayorPorcentaje = this.eventoMayorPorcentaje(porcentajes);
        this.eventoConMenorPorcentaje = this.eventoMenorPorcentaje(porcentajes);
        this.eventoConMayorCapacidad = this.eventoMayorCapacidad(this.eventos);
        let eventosUp = this.filtraEventosUp(currentDate, this.eventos);
        let eventosPast = this.filtraEventosPast(currentDate, this.eventos);
        let listaCategoriasUp = this.filtroCategorias(eventosUp);
        let listaCategoriasPast = this.filtroCategorias(eventosPast);
        this.arrayObjUp = this.arrayObjPorCategoria(eventosUp, listaCategoriasUp);
        this.arrayObjPast = this.arrayObjPorCategoria(
          eventosPast,
          listaCategoriasPast
        );
      })
      .catch((err) => console.log(err));
  },
  methods: {
    porcentajeAsist(listaEventos, currentDate) {
      let pastEvents = listaEventos.filter(
        (evento) => evento.date < currentDate
      );
      let porcentajes = pastEvents.map((evento) => {
        let porcentaje = (evento.assistance * 100) / evento.capacity;
        let objEvento = {
          name: evento.name,
          porcentaje: porcentaje.toFixed(2),
        };

        return objEvento;
      });

      return porcentajes;
    },
    eventoMayorPorcentaje(porcentajes) {
      let eventosOrdenados = [...porcentajes].sort(
        (a, b) => b.porcentaje - a.porcentaje
      );
      return eventosOrdenados[0];
    },
    eventoMenorPorcentaje(porcentajes) {
      let eventosOrdenados = [...porcentajes].sort(
        (a, b) => a.porcentaje - b.porcentaje
      );
      return eventosOrdenados[0];
    },
    eventoMayorCapacidad(listaEventos) {
      let eventosOrdenados = [...listaEventos].sort(
        (a, b) => b.capacity - a.capacity
      );
      return eventosOrdenados[0];
    },
    filtraEventosUp(fechaReferencia, listaEventos) {
      let eventosFiltrados = listaEventos.filter(
        (evento) => evento.date >= fechaReferencia
      );
      return eventosFiltrados;
    },
    filtraEventosPast(fechaReferencia, listaEventos) {
      let eventosFiltrados = listaEventos.filter(
        (evento) => evento.date <= fechaReferencia
      );
      return eventosFiltrados;
    },
    filtroCategorias(listaEventos) {
      let categorias = listaEventos.map((evento) => evento.category);
      let categoriasEventos = [...new Set(categorias)];
      return categoriasEventos;
    },
    arrayObjPorCategoria(listaEventos, listaCategorias) {
      let listaObjCat = listaCategorias.map((categoria) => {
        let eventosCategoria = listaEventos.filter(
          (evento) => evento.category === categoria
        );
        let gananciaTotal = eventosCategoria.reduce(
          (total, evento) =>
            (total += evento.price * (evento.assistance || evento.estimate)),
          0
        );
        let porcentajeAsistencia =
          eventosCategoria.reduce((total, evento) => {
            return (
              total +
              ((evento.assistance || evento.estimate) / evento.capacity) * 100
            );
          }, 0) / eventosCategoria.length;
        let objCategoria = {
          categoria: categoria,
          ganancia: gananciaTotal.toFixed(2),
          porcentajeAsistencia: porcentajeAsistencia.toFixed(2),
        };
        return objCategoria;
      });
      return listaObjCat;
    }
  },
}).mount("#app");
