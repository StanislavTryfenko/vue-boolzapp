const DateTime = luxon.DateTime;

const { createApp } = Vue
createApp({
    data(){
        return{
            contacts: [{
                name: 'Michele',
                avatar: 'contact1.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    },{
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent',
                    },{
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    },],
                },{
                name: 'Fabio',
                avatar: 'contact2.jpg',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    },{
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    },{
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent',
                    },],
                },{
                name: 'Samuele',
                avatar: 'contact3.jpg',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    },{
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    },{
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    },],
                },{
                name: 'Alessandro B.',
                avatar: 'contact4.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    },{
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    },],
                },{
                name: 'Alessandro L.',
                avatar: 'contact5.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent',
                    },{
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received',
                    },],
                },{
                name: 'Claudia',
                avatar: 'contact6.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent',
                    },{
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received',
                    },{
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent',
                    },],
                },{
                name: 'Federico',
                avatar: 'contact7.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent',
                    },{
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received',
                    },],
                },{
                name: 'Davide',
                avatar: 'contact8.jpg',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received',
                    },{
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent',
                    },{
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received',
                    },],
                },],

            activeContact: 0,

            newMessageText: '',

            searchContactText: '',
        }
    },
    methods: {
        newMessage() {
            if (this.newMessageText.length > 0 ) {
                this.contacts[this.activeContact].messages.push({
                    date: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                    message: this.newMessageText,
                    status: 'sent',
                });  
            };
            
            this.newMessageText = '';
            
            setTimeout(() => {
                this.contacts[this.activeContact].messages.push({
                    date: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                    message: 'Tante care cose a te e famiglia',
                    status: 'received',
                });
            }, 1000);

            //setting on position 0 a contact when send him a message (will need improvement for receiving messages)
            this.$nextTick(() => {
                const setFirst = this.contacts.splice(this.activeContact, 1)[0];
                this.contacts.unshift(setFirst);
                this.activeContact = 0;
            });
        },

        removeMessage(index){
            this.contacts[this.activeContact].messages.splice(index, 1,  {
                date: this.contacts[this.activeContact].messages[index].date,
                message: 'Questo messaggio è stato rimosso',
                status: this.contacts[this.activeContact].messages[index].status + 'removed',
            });
        },

        searchContact() {
            this.contacts.forEach(contact => contact.visible = contact.name.toLowerCase().startsWith(this.searchContactText.toLowerCase()) ? true : false);
        },

        scrollBarChatLog(){
            // https://vuejs.org/api/component-instance.html#nexttick (da approfondire, non ci siamo ancora arrivati)
            this.$nextTick(() => {
                document.getElementById('chatLog').scrollTop = document.getElementById('chatLog').scrollHeight;
            });
        },
        hourMinute(time) {
            return DateTime.fromFormat(time, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
        },

    },
    mounted() {
    },
}).mount('#app')