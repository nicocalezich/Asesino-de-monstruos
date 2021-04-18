new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        ataqueJugador: 0,
        ataqueMonstruo: 0
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
        },
        atacar: function () {
            this.ataqueJugador = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -=  this.ataqueJugador
            this.esJugador = true
            this.registrarEvento({text: "GOLPEASTE AL MONSTRUO POR " + this.ataqueJugador + "%", esJugador: this.esJugador })
            this.ataqueDelMonstruo()
            this.verificarGanador()
        },

        ataqueEspecial: function () {
            this.ataqueJugador = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -=  this.ataqueJugador
            this.esJugador = true
            this.registrarEvento({text: "GOLPEASTE DURO AL MONSTRUO POR " + this.ataqueJugador + "%", esJugador: this.esJugador })
            this.ataqueDelMonstruo()
            this.verificarGanador()
        },

        curar: function () {
            if (this.saludJugador < 90){
                this.saludJugador += 10
            }
            else{
                this.saludJugador = 100
            }
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento)
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            this.ataqueMonstruo = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= this.ataqueMonstruo
            this.registrarEvento({text: "EL MONSTRUO GOLPEA POR " + this.ataqueMonstruo + "%", esJugador: !this.esJugador })
            this.verificarGanador()
        },

        calcularHeridas: function (rango) {       
            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0])

        },
        verificarGanador: function () {
            if  (this.saludJugador <= 0){
                if (confirm("Perdiste! jugar de nuevo?")){
                    this.saludJugador = 100
                    this.saludMonstruo = 100
                    this.empezarPartida
                }
                else{
                    this.terminarPartida
                }
            }
            if  (this.saludMonstruo <= 0){
                if (confirm("Ganaste! jugar de nuevo?")){
                    this.saludJugador = 100
                    this.saludMonstruo = 100
                    this.empezarPartida
                }
                else{
                    this.terminarPartida
                }
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es porque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});