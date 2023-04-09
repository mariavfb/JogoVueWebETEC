new Vue({
    el: "#desafio",
    data: {
        jogoIniciado: false,
        desistir: false,
        vidaJogador: 100,
        vidaMonstro: 100,
        battleLog: [],
    },
    
    methods: {
        resetarJogo() {
            this.jogoIniciado = false;
        },
        atacar() {
            const danoJogador = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            this.vidaMonstro -= danoJogador;
            if (this.vidaMonstro < 0) {
                this.vidaMonstro = 0;
                this.resetarJogo();
            } 
            const log = {
                type: 'player',
                message: `JOGADOR ATINGIU MONSTRO COM ${danoJogador}.`
            };
            this.battleLog.unshift(log);
            console.log('jogoIniciado', this.jogoIniciado);
            setTimeout(() => {
                this.monstroAtacar();
            }, 1000);
        },
        ataqueEspecial() {
            const danoJogador = Math.floor(Math.random() * (10 - 5 + 1)) + 10;
            this.vidaMonstro -= danoJogador;
            if (this.vidaMonstro < 0) {
                this.vidaMonstro = 0;
                this.resetarJogo();
            }
            const log = {
                type: 'player',
                message: `JOGADOR ATINGIU MONSTRO COM ${danoJogador}.`
            };
            this.battleLog.unshift(log);
            setTimeout(() => {
                this.monstroAtacar();
            }, 1000);
        },
        monstroAtacar() {
            const danoMonstro = Math.floor(Math.random() * (12 - 7 + 1)) + 7;
            this.vidaJogador -= danoMonstro;
            if (this.vidaJogador < 0) {
                this.vidaJogador = 0;
                this.resetarJogo();
            }
            const log = {
                type: 'monster',
                message: `MONSTRO ATINGIU JOGADOR COM ${danoMonstro}.`
            };
            this.battleLog.unshift(log);
        },
        iniciar() {
            if (this.vidaJogador <= 0 || this.vidaMonstro <= 0) {
                this.jogoIniciado = false;
            } else {
                this.jogoIniciado = true;
            }
            this.vidaJogador = 100;
            this.vidaMonstro = 100;
            this.battleLog = [];
        },
        curar() {
            if (this.vidaJogador < 90) {
                const totalRecuperado = Math.floor(Math.random() * (12 - 7 + 1)) + 9;
                this.vidaJogador += totalRecuperado;
                const message = `JOGADOR GANHOU FORÇA DE ${totalRecuperado}.`;
                this.battleLog.unshift({ type: "player", message });
            } else {
                this.battleLog.unshift({ type: "player", message: "Jogador já está com a vida cheia." });
            }
            setTimeout(() => {
                this.monstroAtacar();
            }, 1000);
        },

    }
});
