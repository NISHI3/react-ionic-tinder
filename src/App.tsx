import React, { useState } from 'react';
import Swipeable from "react-swipy";
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
  IonCard,
  IonCardContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonText,
} from '@ionic/react';
import './App.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { peopleData } from './api/peopleData';
import { people, chatboxes, heart, close, star, navigate } from 'ionicons/icons';


const wrapperStyles = { height: "70%" };
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
  margin: "15px auto 0",
  width: "250px",
};
const button = {
  width: "70px",
  height: "70px",
  background: "#eee",
  marginRight: 10,
  borderRadius: "50%",
  boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.05)"
}
const infoButton = {
  width: "50px",
  height: "50px",
  background: "#eee",
  marginRight: 10,
  marginTop: 20,
  borderRadius: "50%",
  boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.05)"
}

const App: React.FC = () => {  
  const [cards, setCards]= useState(peopleData);
  const [showModal, setShowModal] = useState(false);

  function addCards () {
    let updateCard = cards;
    let random = peopleData[Math.floor(Math.random() * peopleData.length)];
    updateCard.push(random);
    setCards(updateCard)
    console.log(cards)
  }

  function AfterSwipe () {
    addCards()
    setCards(cards.slice(1, cards.length));
  }

  return (
    <div id='app'>
        <IonApp>
          <IonContent>
            <IonHeader>
              <IonToolbar>
              <IonButtons slot="start">
                <IonIcon slot="icon-only" icon={people}></IonIcon>
              </IonButtons>
              <IonButtons slot="end">
                <IonIcon slot="icon-only" icon={chatboxes}></IonIcon>
              </IonButtons>
              </IonToolbar>
            </IonHeader>
            <div style={wrapperStyles}>
              <Swipeable
                buttons={({ right, left}) => (
                  <div style={actionsStyles}>
                    <button style={button}  onClick={left}><IonIcon style={{color: 'red'}} size="large" slot="icon-only" icon={close} /></button>
                    <button style={infoButton} onClick={() => setShowModal(true)}><IonIcon style={{color: 'blue'}} size="small" slot="icon-only" icon={star} /></button>
                    <button style={button} onClick={right}><IonIcon style={{color: 'green'}} size="large" slot="icon-only" icon={heart} /></button>
                  </div>
                )}
                onAfterSwipe={AfterSwipe}
              >
                <IonCard key={cards[0].name}>
                  <IonCardContent>
                    <img src={cards[0].img} alt={cards[0].name}/>
                    <IonLabel><b>{cards[0].name}</b>, {cards[0].age}</IonLabel>
                    <p>{cards[0].work}</p>
                  </IonCardContent>
                </IonCard>
              </Swipeable>
            </div>
            <IonModal isOpen={showModal}>
              <img src={cards[0].img} alt={cards[0].name} />
              <div style={{marginLeft: 10}}>
              <IonText>
                <h2>{cards[0].name}, {cards[0].age}</h2>
                <h5>{cards[0].work}</h5>
                <p><IonIcon icon={navigate}></IonIcon> {cards[0].distance}km away</p>
              </IonText>
              </div>
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonModal>
          </IonContent>
        </IonApp>
      </div>
  );
}

export default App;
