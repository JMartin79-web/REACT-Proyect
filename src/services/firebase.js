// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Obtén todos los documentos de una colección
import { getFirestore, collection, doc, getDocs, getDoc, query, orderBy, where, addDoc, writeBatch, documentId } from "firebase/firestore";
import {} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrmCwqHLcJ0EDaBNxm1ZndWXdXu2Qwius",
  authDomain: "react-2f74d.firebaseapp.com",
  projectId: "react-2f74d",
  storageBucket: "react-2f74d.appspot.com",
  messagingSenderId: "952333209440",
  appId: "1:952333209440:web:1bd640c5b8f6d795b31805"
};

// Initialize Firebase y conectarse al firestore(base de datos)
const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);


// RECIBIR LOS DATOS

export async function getDatos(){
    const collectionRef = collection(db, "pokemons")
    const q = query(collectionRef, orderBy("idPkm"))
    let results = await getDocs(q)
    
    let datos = results.docs.map( (doc)=>{
       return ({ id: doc.id, ...doc.data()})
    })
    return datos
}
  
  
  // RECIBIR DATOS FILTRADOS
  export async function getCategoryDatos(category){
    const collectionRef = collection(db, "pokemons");
    const queryCategory = query(
        collectionRef,where("type", "array-contains", category), orderBy("idPkm")
      );
    
      let results = await getDocs(queryCategory);
        console.log(results)
      let dataCategory = results.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(dataCategory)
      return dataCategory;    
  }
  
  
  // RECIBIR UN SOLO DATO
  export async function getDato(id){
    const docRef = doc(db, "pokemons", id);
    const docResult = await getDoc(docRef);
    if (docResult.exists()) {
        return { id: docResult.id, ...docResult.data() };
    }
  }

  // MANDAR ORDEN DE COMPRA
  export async function createBuyOrder(order){
    const batch = writeBatch(db)
    const collectionRef = collection(db, "orders");
    const collectionItemsRef = collection(db, "pokemons")

    const arrayIds = order.cart.map( (item) => item.id )
    const q = query(collectionItemsRef, where(documentId(), "in", arrayIds))
    
    let itemsToUpdate = await getDocs(q)
    itemsToUpdate.docs.forEach( doc => {
      let itemInCart = order.cart.find( item => item.id === doc.id)
      batch.update(doc.ref, {
        stock: doc.data().stock -= itemInCart.count
      })
    })
    batch.commit()
    let respuesta = await addDoc(collectionRef, order)
    console.log(respuesta.id)
  }


  // MANDAR OBJETO A FIREBASE
  /*
  async function setDataToFirebase(){
    const data = [
    
      {
        "idPkm": 1,
        "num": "001",
        "name": "Bulbasaur",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
        "description": "Una rara semilla fue plantada en su espalda al nacer. La planta brota y crece con este Pokémon",
        "type": [
          "grass",
          "poison"
        ]
      },

      {
        "idPkm": 2,
        "num": "002",
        "name": "Ivysaur",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/002.png",
        "description": "Cuando el bulbo de su espalda crece, parece no poder ponerse de pie sobre sus patas traseras",
        "type": [
          "grass",
          "poison"
        ]
      },

      {
        "idPkm": 3,
        "num": "003",
        "name": "Venusaur",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/003.png",
        "description": "La planta florece cuando absorbe energía solar, lo cual le obliga a buscar siempre la luz del sol.",
        "type": [
          "grass",
          "poison"
        ]
      },

      {
        "idPkm": 4,
        "num": "004",
        "name": "Charmander",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/004.png",
        "description": "Prefiere las cosas calientes. Dicen que cuando llueve le sale vapor de la punta de la cola.",
        "type": [
          "fire"
        ]
      },

      {
        "idPkm": 5,
        "num": "005",
        "name": "Charmeleon",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/005.png",
        "description": "Este Pokémon de naturaleza agresiva ataca en combate con su cola llameante y hace trizas al rival con sus afiladas garras.",     
        "type": [
          "fire"
        ]
      }, 

      {
        "idPkm": 6,
        "num": "006",
        "name": "Charizard",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/006.png",
        "description": "Escupe un fuego tan caliente que funde las rocas. Causa incendios forestales sin querer.",
        "type": [
          "fire",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 7,
        "num": "007",
        "name": "Squirtle",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/007.png",
        "description": "Cuando retrae su largo cuello en el caparazón, dispara agua a una presión increíble.",
        "type": [
          "water"
        ]
      }, 
      
      {
        "idPkm": 8,
        "num": "008",
        "name": "Wartortle",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/008.png",
        "description": "Se lo considera un símbolo de longevidad. Los ejemplares más ancianos tienen musgo sobre el caparazón.",
        "type": [
          "water"
        ]
      }, 
      
      {
        "idPkm": 9,
        "num": "009",
        "name": "Blastoise",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/009.png",
        "description": "Para acabar con su enemigo, lo aplasta con el peso de su cuerpo. En momentos de apuro, se esconde en el caparazón.",
        "type": [
          "water"
        ]
      }, 
      
      {
        "idPkm": 10,
        "num": "010",
        "name": "Caterpie",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/010.png",
        "description": "Para protegerse, despide un hedor horrible por las antenas con el que repele a sus enemigos.",
        "type": [
          "bug"
        ]
      }, 
      
      {
        "idPkm": 11,
        "num": "011",
        "name": "Metapod",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/011.png",
        "description": "Como en este estado solo puede endurecer su coraza, permanece inmóvil a la espera de evolucionar.",
        "type": [
          "bug"
        ]
      }, 
      
      {
        "idPkm": 12,
        "num": "012",
        "name": "Butterfree",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/012.png",
        "description": "Aletea a gran velocidad para lanzar al aire sus escamas extremadamente tóxicas.",
        "type": [
          "bug",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 13,
        "num": "013",
        "name": "Weedle",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/013.png",
        "description": "El aguijón de la cabeza es muy puntiagudo. Se alimenta de hojas oculto en la espesura de bosques y praderas.",
        "type": [
          "bug",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 14,
        "num": "014",
        "name": "Kakuna",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/014.png",
        "description": "Aunque es casi incapaz de moverse, en caso de sentirse amenazado puede envenenar a los enemigos con su aguijón.",
        "type": [
          "bug",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 15,
        "num": "015",
        "name": "Beedrill",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/015.png",
        "description": "Tiene tres aguijones venenosos, dos en las patas anteriores y uno en la parte baja del abdomen, con los que ataca a sus enemigos una y otra vez.",
        "type": [
          "bug",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 16,
        "num": "016",
        "name": "Pidgey",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/016.png",
        "description": "Su docilidad es tal que suelen defenderse levantando arena en lugar de contraatacar.",
        "type": [
          "normal",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 17,
        "num": "017",
        "name": "Pidgeotto",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/017.png",
        "description": "Su extraordinaria vitalidad y resistencia le permiten cubrir grandes distancias del territorio que habita en busca de presas.",
        "type": [
          "normal",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 18,
        "num": "018",
        "name": "Pidgeot",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/018.png",
        "description": "Este Pokémon vuela a una velocidad de 2 mach en busca de presas. Sus grandes garras son armas muy peligrosas.",
        "type": [
          "normal",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 19,
        "num": "019",
        "name": "Rattata",
        "stock": 10,
        "price": 100,
        "img": "http://www.serebii.net/pokemongo/pokemon/019.png",
        "description": "Es propenso a hincar los incisivos en cualquier cosa que se le ponga por delante. Si se ve alguno, seguramente haya cuarenta cerca.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 20,
        "num": "020",
        "name": "Raticate",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/020.png",
        "description": "Gracias a las pequeñas membranas de las patas traseras, puede nadar por los ríos para capturar presas.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 21,
        "num": "021",
        "name": "Spearow",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/021.png",
        "description": "A la hora de proteger su territorio, compensa su incapacidad para volar a gran altura con una increíble velocidad.",
        "type": [
          "normal",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 22,
        "num": "022",
        "name": "Fearow",
        "stock": 10,
        "price": 2500,
        "img": "http://www.serebii.net/pokemongo/pokemon/022.png",
        "description": "Este Pokémon ha existido desde tiempos remotos. Al menor atisbo de peligro, alza el vuelo y huye.",
        "type": [
          "normal",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 23,
        "num": "023",
        "name": "Ekans",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/023.png",
        "description": "La longitud de este Pokémon aumenta con el tiempo. Por la noche, se enrosca en las ramas de los árboles para descansar.",
        "type": [
          "poison"
        ]
      }, 
      
      {
        "idPkm": 24,
        "num": "024",
        "name": "Arbok",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/024.png",
        "description": "Se han llegado a identificar hasta seis variaciones distintas de los espeluznantes dibujos de su piel.",
        "type": [
          "poison"
        ]
      }, 
      
      {
        "idPkm": 25,
        "num": "025",
        "name": "Pikachu",
        "stock": 0,
        "price": 5000,
        "img": "http://www.serebii.net/pokemongo/pokemon/025.png",
        "description": "Cuanto más potente es la energía eléctrica que genera este Pokémon, más suaves y elásticas se vuelven las bolsas de sus mejillas.",
        "type": [
          "electric"
        ]
      }, 
      
      {
        "idPkm": 26,
        "num": "026",
        "name": "Raichu",
        "stock": 0,
        "price": 7000,
        "img": "http://www.serebii.net/pokemongo/pokemon/026.png",
        "description": "Su larga cola le sirve como toma de tierra para protegerse a sí mismo del alto voltaje que genera su cuerpo.",
        "type": [
          "electric"
        ]
      }, 
      
      {
        "idPkm": 27,
        "num": "027",
        "name": "Sandshrew",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/027.png",
        "description": "Le gusta revolcarse por la arena seca para eliminar todo rastro de suciedad y humedad en la piel.",
        "type": [
          "ground"
        ]
      }, 
      
      {
        "idPkm": 28,
        "num": "028",
        "name": "Sandslash",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/028.png",
        "description": "Cuanto más seco es el terreno en el que habita, más duras y lisas se vuelven las púas que le recubren la espalda.",
        "type": [
          "ground"
        ]
      }, 
      
      {
        "idPkm": 29,
        "num": "029",
        "name": "Nidoran ♀ (Female)",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/029.png",
        "description": "Posee un olfato más fino que los Nidoran♂. Usa los bigotes para percibir la dirección del viento y buscar comida a sotavento de sus depredadores.",
        "type": [
          "poison"
        ]
      }, 
      
      {
        "idPkm": 30,
        "num": "030",
        "name": "Nidorina",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/030.png",
        "description": "Se cree que el cuerno de la frente se le ha atrofiado para evitar herir a sus crías al alimentarlas.",
        "type": [
          "poison"
        ]
      }, 
      
      {
        "idPkm": 31,
        "num": "031",
        "name": "Nidoqueen",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/031.png",
        "description": "Su defensa destaca sobre la capacidad ofensiva. Usa las escamas del cuerpo como una coraza para proteger a su prole de cualquier ataque.",
        "type": [
          "poison",
          "ground"
        ]
      }, 
      
      {
        "idPkm": 32,
        "num": "032",
        "name": "Nidoran ♂ (Male)",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/032.png",
        "description": "Mantiene sus grandes orejas levantadas, siempre alerta. Si advierte peligro, ataca inoculando una potente toxina con su cuerno frontal.",
        "type": [
          "poison"
        ]
      }, 
      
      {
        "idPkm": 33,
        "num": "033",
        "name": "Nidorino",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/033.png",
        "description": "Dondequiera que va, parte rocas con su cuerno, más duro que un diamante, en busca de una Piedra Lunar.",
        "type": [
          "poison"
        ]
      }, 
      
      {
        "idPkm": 34,
        "num": "034",
        "name": "Nidoking",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/034.png",
        "description": "Una vez que se desboca, no hay quien lo pare. Solo se calma ante Nidoqueen, su compañera de toda la vida.",
        "type": [
          "poison",
          "ground"
        ]
      }, 
      
      {
        "idPkm": 35,
        "num": "035",
        "name": "Clefairy",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/035.png",
        "description": "Se dice que la felicidad llegará a quien vea un grupo de Clefairy bailando a la luz de la luna llena.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 36,
        "num": "036",
        "name": "Clefable",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/036.png",
        "description": "Este Pokémon de aspecto feérico, raramente visto por los humanos, corre a esconderse en cuanto detecta que hay alguien cerca.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 37,
        "num": "037",
        "name": "Vulpix",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/037.png",
        "description": "De pequeño, tiene seis colas de gran belleza. A medida que crece, le van saliendo más.",
        "type": [
          "fire"
        ]
      }, 
      
      {
        "idPkm": 38,
        "num": "038",
        "name": "Ninetales",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/038.png",
        "description": "Cuentan que llega a vivir hasta mil años y que cada una de las colas posee poderes sobrenaturales.",
        "type": [
          "fire"
        ]
      }, 
      
      {
        "idPkm": 39,
        "num": "039",
        "name": "Jigglypuff",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/039.png",
        "description": "Su capacidad pulmonar es excepcional, incluso para un Pokémon. Es capaz de cantar nanas sin cesar hasta que su rival se duerma.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 40,
        "num": "040",
        "name": "Wigglytuff",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/040.png",
        "description": "Cuanto más aire inhala, más aumenta de tamaño. Si se enfada, hincha el cuerpo con el fin de intimidar a su oponente.",
        "type": [
          "normal"
        ]
      },
      
      {
        "idPkm": 41,
        "num": "041",
        "name": "Zubat",
        "stock": 100,
        "price": 300,
        "img": "http://www.serebii.net/pokemongo/pokemon/041.png",
        "description": "Emite ondas ultrasónicas por la boca para escrutar el entorno, lo que le permite volar con pericia por cuevas angostas.",
        "type": [
          "poison",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 42,
        "num": "042",
        "name": "Golbat",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/042.png",
        "description": "Le encanta chuparles la sangre a los seres vivos. En ocasiones comparte la preciada colecta con otros congéneres hambrientos.",
        "type": [
          "poison",
          "flying"
        ]
      }, 
      
      {
        "idPkm": 43,
        "num": "043",
        "name": "Oddish",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/043.png",
        "description": "Se mueve al exponerse a la luz de la luna. Merodea por la noche para esparcir sus semillas.",
        "type": [
          "grass",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 44,
        "num": "044",
        "name": "Gloom",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/044.png",
        "description": "Libera un fétido olor por los pistilos. El fuerte hedor hace perder el conocimiento a cualquiera que se encuentre en un radio de 2 km.",
        "type": [
          "grass",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 45,
        "num": "045",
        "name": "Vileplume",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/045.png",
        "description": "Tiene los pétalos más grandes del mundo. Al caminar, de ellos se desprenden densas nubes de polen tóxico.",
        "type": [
          "grass",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 46,
        "num": "046",
        "name": "Paras",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/046.png",
        "description": "Escarba en el suelo para extraer nutrientes de las raíces de los árboles, que las setas del lomo absorben después casi por completo.",
        "type": [
          "bug",
          "grass"
        ]
      },
      
      {
        "idPkm": 47,
        "num": "047",
        "name": "Parasect",
        "stock": 10,
        "price": 500,
        "img": "http://www.serebii.net/pokemongo/pokemon/047.png",
        "description": "Tras largo tiempo absorbiendo la energía del huésped, la seta parásita del lomo es la que parece controlar la voluntad de este Pokémon.",
        "type": [
          "bug",
          "grass"
        ]
      }, 
      
      {
        "idPkm": 48,
        "num": "048",
        "name": "Venonat",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/048.png",
        "description": "Sus grandes ojos actúan como radares. A plena luz se percibe que son, en realidad, grupos de ojos diminutos.",
        "type": [
          "bug",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 49,
        "num": "049",
        "name": "Venomoth",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/049.png",
        "description": "Las alas desprenden un polvillo de escamas impregnado de toxinas que se adhiere al contacto y resulta difícil de quitar.",
        "type": [
          "bug",
          "poison"
        ]
      }, 
      
      {
        "idPkm": 50,
        "num": "050",
        "name": "Diglett",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/050.png",
        "description": "Si un Diglett excava un terreno, lo deja perfectamente arado y preparado para sembrarlo.",
        "type": [
          "ground"
        ]
      }, 
      
      {
        "idPkm": 51,
        "num": "051",
        "name": "Dugtrio",
        "stock": 10,
        "price": 2500,
        "img": "http://www.serebii.net/pokemongo/pokemon/051.png",
        "description": "Un trío de Diglett. Causa enormes terremotos al cavar en el subsuelo a profundidades de hasta 100 km.",
        "type": [
          "ground"
        ]
      },
      
      {
        "idPkm": 52,
        "num": "052",
        "name": "Meowth",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/052.png",
        "description": "Le encanta reunir objetos brillantes. Cuando está de buen humor, hasta le muestra la colección a su Entrenador.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 53,
        "num": "053",
        "name": "Persian",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/053.png",
        "description": "Trabar amistad con este Pokémon es una ardua tarea debido a su enorme orgullo. Cuando algo no le place, saca las uñas de inmediato.",
        "type": [
          "normal"
        ]
      }, 
      
      {
        "idPkm": 54,
        "num": "054",
        "name": "Psyduck",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/054.png",
        "description": "Siempre padece dolores de cabeza. Tras desatar sus misteriosos poderes, la jaqueca remite unos instantes.",
        "type": [
          "water"
        ]
      }, 
      
      {
        "idPkm": 55,
        "num": "055",
        "name": "Golduck",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/055.png",
        "description": "Habita en ríos de aguas plácidas. Sus largas extremidades le permiten nadar con gracilidad.",
        "type": [
          "water"
        ]
      }, 
      
      {
        "idPkm": 56,
        "num": "056",
        "name": "Mankey",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/056.png",
        "description": "Este ágil Pokémon vive en los árboles. Se enfada con facilidad y, cuando lo hace, se abalanza contra todo lo que se encuentre a su alrededor.",
        "type": [
          "fighting"
        ]
      }, 
      
      {
        "idPkm": 57,
        "num": "057",
        "name": "Primeape",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/057.png",
        "description": "Solo se calma cuando no hay nadie cerca, por lo que llegar a ver ese momento resulta verdaderamente difícil.",
        "type": [
          "fighting"
        ]
      }, {
        "idPkm": 58,
        "num": "058",
        "name": "Growlithe",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/058.png",
        "description": "De naturaleza valiente y honrada, se enfrenta sin miedo a enemigos más grandes y fuertes.",
        "type": [
          "fire"
        ]
      }, {
        "idPkm": 59,
        "num": "059",
        "name": "Arcanine",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/059.png",
        "description": "Es capaz de correr 10 000 km al día, lo que deja embelesados a todos los que lo ven pasar.",
        "type": [
          "fire"
        ]
      }, {
        "idPkm": 60,
        "num": "060",
        "name": "Poliwag",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/060.png",
        "description": "Es más ágil en el agua que en la tierra. La espiral de su vientre no es más que parte de sus vísceras que se ven a través de la piel.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 61,
        "num": "061",
        "name": "Poliwhirl",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/061.png",
        "description": "Mirar fijamente la espiral de su vientre provoca somnolencia, por lo que puede usarse como alternativa a las nanas para dormir a los niños.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 62,
        "num": "062",
        "name": "Poliwrath",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/062.png",
        "description": "Su cuerpo es puro músculo. Logra abrirse paso por aguas gélidas partiendo el hielo con sus fornidos brazos.",
        "type": [
          "water",
          "fighting"
        ]
      }, {
        "idPkm": 63,
        "num": "063",
        "name": "Abra",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/063.png",
        "description": "Es capaz de usar sus poderes psíquicos aun estando dormido. Al parecer, el contenido del sueño influye en sus facultades.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 64,
        "num": "064",
        "name": "Kadabra",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/064.png",
        "description": "Duerme suspendido en el aire gracias a sus poderes psíquicos. La cola, de una flexibilidad extraordinaria, hace las veces de almohada.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 65,
        "num": "065",
        "name": "Alakazam",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/065.png",
        "description": "Posee una capacidad intelectual fuera de lo común que le permite recordar todo lo sucedido desde el instante de su nacimiento.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 66,
        "num": "066",
        "name": "Machop",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/066.png",
        "description": "Es una masa de músculos y, pese a su pequeño tamaño, tiene fuerza de sobra para levantar en brazos a 100 personas.",
        "type": [
          "fighting"
        ]
      }, {
        "idPkm": 67,
        "num": "067",
        "name": "Machoke",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/067.png",
        "description": "Su musculoso cuerpo es tan fuerte que usa un cinto antifuerza para controlar sus movimientos.",
        "type": [
          "fighting"
        ]
      }, {
        "idPkm": 68,
        "num": "068",
        "name": "Machamp",
        "stock": 10,
        "price": 4000,
        "img": "http://www.serebii.net/pokemongo/pokemon/068.png",
        "description": "Mueve rápidamente sus cuatro brazos para asestar incesantes golpes y puñetazos desde todos los ángulos.",
        "type": [
          "fighting"
        ]
      }, {
        "idPkm": 69,
        "num": "069",
        "name": "Bellsprout",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/069.png",
        "description": "Prefiere lugares cálidos y húmedos. Atrapa pequeños Pokémon insectos con sus lianas para devorarlos.",
        "type": [
          "grass",
          "poison"
        ]
      }, {
        "idPkm": 70,
        "num": "070",
        "name": "Weepinbell",
        "stock": 10,
        "price": 2500,
        "img": "http://www.serebii.net/pokemongo/pokemon/070.png",
        "description": "Cuando tiene hambre, engulle a todo lo que se mueve. La pobre presa acaba disuelta en sus ácidos.",
        "type": [
          "grass",
          "poison"
        ]
      }, {
        "idPkm": 71,
        "num": "071",
        "name": "Victreebel",
        "stock": 10,
        "price": 4000,
        "img": "http://www.serebii.net/pokemongo/pokemon/071.png",
        "description": "Atrae a su presa con un dulce aroma a miel. Una vez atrapada en la boca, la disuelve en tan solo un día, huesos incluidos.",
        "type": [
          "grass",
          "poison"
        ]
      }, {
        "idPkm": 72,
        "num": "072",
        "name": "Tentacool",
        "stock": 60,
        "price": 800,
        "img": "http://www.serebii.net/pokemongo/pokemon/072.png",
        "description": "Sus facultades natatorias son más bien escasas, por lo que se limita a flotar a la deriva en aguas poco profundas en busca de alimento.",
        "type": [
          "water",
          "poison"
        ]
      }, {
        "idPkm": 73,
        "num": "073",
        "name": "Tentacruel",
        "stock": 30,
        "price": 1500,
        "img": "http://www.serebii.net/pokemongo/pokemon/073.png",
        "description": "Si las esferas rojas que tiene a ambos lados de la cabeza brillan con intensidad, indica que está a punto de lanzar ondas ultrasónicas.",
        "type": [
          "water",
          "poison"
        ]
      }, {
        "idPkm": 74,
        "num": "074",
        "name": "Geodude",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/074.png",
        "description": "Se suele encontrar en senderos de montaña y sitios parecidos. Conviene andar con cuidado para no pisarlo sin querer y provocar su enfado.",
        "type": [
          "rock",
          "ground"
        ]
      }, {
        "idPkm": 75,
        "num": "075",
        "name": "Graveler",
        "stock": 20,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/075.png",
        "description": "Se le suele ver rodando montaña abajo. No evita los obstáculos, sino que los arrolla.",
        "type": [
          "rock",
          "ground"
        ]
      }, {
        "idPkm": 76,
        "num": "076",
        "name": "Golem",
        "stock": 10,
        "price": 4500,
        "img": "http://www.serebii.net/pokemongo/pokemon/076.png",
        "description": "Nada más mudar la piel, su cuerpo se vuelve blando y blanquecino, pero se endurece al poco tiempo de entrar en contacto con el aire.",
        "type": [
          "rock",
          "ground"
        ]
      }, {
        "idPkm": 77,
        "num": "077",
        "name": "Ponyta",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/077.png",
        "description": "Al nacer es un poco lento, pero va fortaleciendo las patas paulatinamente al disputar carreras con sus congéneres.",
        "type": [
          "fire"
        ]
      }, {
        "idPkm": 78,
        "num": "078",
        "name": "Rapidash",
        "stock": 10,
        "price": 2700,
        "img": "http://www.serebii.net/pokemongo/pokemon/078.png",
        "description": "Su ardiente crin ondea al viento mientras atraviesa extensas praderas a una velocidad de 240 km/h.",
        "type": [
          "fire"
        ]
      }, {
        "idPkm": 79,
        "num": "079",
        "name": "Slowpoke",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/079.png",
        "description": "Es lento y abstraído. Aunque le devoren la cola, ni siquiera se percata, ya que no siente ningún dolor. Tampoco nota cuando le vuelve a crecer.",
        "type": [
          "water",
          "psychic"
        ]
      }, {
        "idPkm": 80,
        "num": "080",
        "name": "Slowbro",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/080.png",
        "description": "Ha evolucionado después de que lo mordiera un Shellder, al cual le embelesa la sustancia que secreta por la cola.",
        "type": [
          "water",
          "psychic"
        ]
      }, {
        "idPkm": 81,
        "num": "081",
        "name": "Magnemite",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/081.png",
        "description": "A veces se desploman al suelo tras agotar su suministro eléctrico interno, pero basta una pequeña batería para reanimarlos.",
        "type": [
          "electric"
        ]
      }, {
        "idPkm": 82,
        "num": "082",
        "name": "Magneton",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/082.png",
        "description": "Este Pokémon, surgido de la unión de tres Magnemite, genera potentes ondas de radio con las que examina el entorno.",
        "type": [
          "electric"
        ]
      }, {
        "idPkm": 83,
        "num": "083",
        "name": "Farfetch'd",
        "stock": 10,
        "price": 500,
        "img": "http://www.serebii.net/pokemongo/pokemon/083.png",
        "description": "Blande el puerro que sujeta con un ala como si se tratase de una espada para rebanar a su rival. En caso de necesidad, se lo come para nutrirse.",
        "type": [
          "normal",
          "flying"
        ]
      }, {
        "idPkm": 84,
        "num": "084",
        "name": "Doduo",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/084.png",
        "description": "Las diminutas alas apenas le permiten volar, pero puede correr a gran velocidad gracias a sus patas hiperdesarrolladas.",
        "type": [
          "normal",
          "flying"
        ]
      }, {
        "idPkm": 85,
        "num": "085",
        "name": "Dodrio",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/085.png",
        "description": "Este Pokémon surge al dividirse una de las cabezas de Doduo. Es capaz de correr por las praderas a 60 km/h.",
        "type": [
          "normal",
          "flying"
        ]
      }, {
        "idPkm": 86,
        "num": "086",
        "name": "Seel",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/086.png",
        "description": "Le encantan los lugares gélidos y disfruta nadando en aguas a temperaturas en torno a los -10 ºC.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 87,
        "num": "087",
        "name": "Dewgong",
        "stock": 10,
        "price": 2300,
        "img": "http://www.serebii.net/pokemongo/pokemon/087.png",
        "description": "Su cuerpo es blanco como la nieve. Puede nadar plácidamente en mares gélidos gracias a su resistencia al frío.",
        "type": [
          "water",
          "ice"
        ]
      }, {
        "idPkm": 88,
        "num": "088",
        "name": "Grimer",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/088.png",
        "description": "Está hecho de lodo endurecido. Pocos se atreven a tocarlo debido a su pestilencia y composición nociva. Allá por donde pasa no crece la hierba.",
        "type": [
          "poison"
        ]
      }, {
        "idPkm": 89,
        "num": "089",
        "name": "Muk",
        "stock": 10,
        "price": 3600,
        "img": "http://www.serebii.net/pokemongo/pokemon/089.png",
        "description": "Huele tan mal que puede provocar desmayos. Su nariz se ha atrofiado de tal manera que ha perdido por completo el sentido del olfato.",
        "type": [
          "poison"
        ]
      }, {
        "idPkm": 90,
        "num": "090",
        "name": "Shellder",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/090.png",
        "description": "Nada hacia atrás abriendo y cerrando su concha. Es sorprendentemente rápido.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 91,
        "num": "091",
        "name": "Cloyster",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/091.png",
        "description": "La concha que lo cubre es extremadamente dura, hasta el punto de que ni siquiera una bomba puede destrozarla. Solo se abre cuando ataca.",
        "type": [
          "water",
          "ice"
        ]
      }, {
        "idPkm": 92,
        "num": "092",
        "name": "Gastly",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/092.png",
        "description": "Nació a partir de gases venenosos que asfixiarían a cualquiera que se viera envuelto en ellos.",
        "type": [
          "ghost",
          "poison"
        ]
      }, {
        "idPkm": 93,
        "num": "093",
        "name": "Haunter",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/093.png",
        "description": "Su lengua está hecha de gas. Si lame a su víctima, esta sufrirá constantes temblores hasta fallecer.",
        "type": [
          "ghost",
          "poison"
        ]
      }, {
        "idPkm": 94,
        "num": "094",
        "name": "Gengar",
        "stock": 10,
        "price": 4000,
        "img": "http://www.serebii.net/pokemongo/pokemon/094.png",
        "description": "Las noches de luna llena, a este Pokémon le gusta imitar las sombras de la gente y burlarse de sus miedos.",
        "type": [
          "ghost",
          "poison"
        ]
      }, {
        "idPkm": 95,
        "num": "095",
        "name": "Onix",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/095.png",
        "description": "Al abrirse paso bajo tierra, va absorbiendo todo lo que encuentra. Eso hace que su cuerpo sea así de sólido.",
        "type": [
          "rock",
          "ground"
        ]
      }, {
        "idPkm": 96,
        "num": "096",
        "name": "Drowzee",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/096.png",
        "description": "Si se duerme siempre en compañía de un Pokémon de esta especie, puede mostrar sueños que haya ingerido con anterioridad.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 97,
        "num": "097",
        "name": "Hypno",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/097.png",
        "description": "Conviene evitar el contacto visual en caso de encontrarse con este Pokémon, ya que puede hipnotizar con su péndulo.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 98,
        "num": "098",
        "name": "Krabby",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/098.png",
        "description": "Es fácil encontrarlo cerca del mar. Las largas pinzas que tiene vuelven a crecer si se las quitan de su sitio.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 99,
        "num": "099",
        "name": "Kingler",
        "stock": 10,
        "price": 2400,
        "img": "http://www.serebii.net/pokemongo/pokemon/099.png",
        "description": "La pinza tan grande que tiene posee una fuerza de 10 000 CV, pero le cuesta moverla por su gran tamaño.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 100,
        "num": "100",
        "name": "Voltorb",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/100.png",
        "description": "Se dice que se camufla como una Poké Ball. Al más mínimo estímulo se autodestruirá.",
        "type": [
          "electric"
        ]
      }, {
        "idPkm": 101,
        "num": "101",
        "name": "Electrode",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/101.png",
        "description": "Almacena tal cantidad de energía eléctrica en su cuerpo que el más leve impacto puede provocar una gran explosión.",
        "type": [
          "electric"
        ]
      }, {
        "idPkm": 102,
        "num": "102",
        "name": "Exeggcute",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/102.png",
        "description": "Pese a su aspecto de mera piña de huevos, se trata de un Pokémon. Al parecer, sus cabezas se comunican entre sí por telepatía.",
        "type": [
          "grass",
          "psychic"
        ]
      }, 
      
      {
        "idPkm": 103,
        "num": "103",
        "name": "Exeggutor",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/103.png",
        "description": "Cada una de las tres cabezas piensa de forma independiente y apenas muestra interés por el resto.",
        "type": [
          "grass",
          "psychic"
        ]
      },
      
      {
        "idPkm": 104,
        "num": "104",
        "name": "Cubone",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/104.png",
        "description": "Cuando llora al acordarse de su madre fallecida, su llanto resuena en el cráneo que lleva en la cabeza.",
        "type": [
          "ground"
        ]
      },
      
      {
        "idPkm": 105,
        "num": "105",
        "name": "Marowak",
        "stock": 0,
        "price": 3200,
        "img": "http://www.serebii.net/pokemongo/pokemon/105.png",
        "description": "Ha evolucionado tras fortalecerse y superar su pena. Ahora lucha con arrojo blandiendo su hueso a modo de arma.",
        "type": [
          "ground"
        ]
      },
      
      {
        "idPkm": 106,
        "num": "106",
        "name": "Hitmonlee",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/106.png",
        "description": "Este Pokémon tiene un sentido del equilibrio increíble. Puede dar patadas desde cualquier posición.",
        "type": [
          "fighting"
        ]
      },
      
      {
        "idPkm": 107,
        "num": "107",
        "name": "Hitmonchan",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/107.png",
        "description": "Sus puñetazos cortan el aire. Son tan veloces que el mínimo roce podría causar una quemadura.",
        "type": [
          "fighting"
        ]
      }, 
      
      {
        "idPkm": 108,
        "num": "108",
        "name": "Lickitung",
        "stock": 10,
        "price": 2300,
        "img": "http://www.serebii.net/pokemongo/pokemon/108.png",
        "description": "Si sus lametones no se tratan a tiempo, su saliva pegajosa y urticante puede provocar picores persistentes.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 109,
        "num": "109",
        "name": "Koffing",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/109.png",
        "description": "Su cuerpo está lleno a rebosar de gas venenoso. Acude a los vertederos atraído por el putrefacto olor que emana de los desperdicios.",
        "type": [
          "poison"
        ]
      }, {
        "idPkm": 110,
        "num": "110",
        "name": "Weezing",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/110.png",
        "description": "Usa sus dos cuerpos para mezclar gases. Según parece, en el pasado podían hallarse ejemplares por todos los rincones de Galar.",
        "type": [
          "poison"
        ]
      }, {
        "idPkm": 111,
        "num": "111",
        "name": "Rhyhorn",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/111.png",
        "description": "Su inteligencia es limitada, aunque posee una fuerza tan considerable que le permite incluso derribar rascacielos con solo embestirlos.",
        "type": [
          "ground",
          "rock"
        ]
      }, {
        "idPkm": 112,
        "num": "112",
        "name": "Rhydon",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/112.png",
        "description": "Cuando evoluciona, comienza a andar con las patas traseras. Es capaz de horadar rocas con el cuerno que tiene.",
        "type": [
          "ground",
          "rock"
        ]
      }, {
        "idPkm": 113,
        "num": "113",
        "name": "Chansey",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/113.png",
        "description": "Los huevos que pone Chansey tienen un valor nutritivo altísimo y un sabor exquisito. Se consideran un manjar.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 114,
        "num": "114",
        "name": "Tangela",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/114.png",
        "description": "Sus lianas no dejan de crecer aunque se le desprendan. Aún se desconoce qué aspecto tiene sin ellas.",
        "type": [
          "grass"
        ]
      }, {
        "idPkm": 115,
        "num": "115",
        "name": "Kangaskhan",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/115.png",
        "description": "Aunque lleve una cría en el marsupio, su juego de pies no pierde ligereza. Abruma al rival con ráfagas de ágiles puñetazos.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 116,
        "num": "116",
        "name": "Horsea",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/116.png",
        "description": "Habita en mares de aguas tranquilas. Si se siente en peligro, expulsará por la boca una densa tinta negra para poder huir.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 117,
        "num": "117",
        "name": "Seadra",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/117.png",
        "description": "En esta especie, es el macho quien se ocupa de la prole. Durante la época de cría, el veneno de las púas de su espalda se vuelve más potente.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 118,
        "num": "118",
        "name": "Goldeen",
        "stock": 10,
        "price": 300,
        "img": "http://www.serebii.net/pokemongo/pokemon/118.png",
        "description": "Sus aletas pectorales, caudal y dorsal ondean gráciles en el agua. Por eso se le llama el Bailarín Acuático.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 119,
        "num": "119",
        "name": "Seaking",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/119.png",
        "description": "En otoño gana algo de peso para atraer a posibles parejas y se cubre de llamativos colores.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 120,
        "num": "120",
        "name": "Staryu",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/120.png",
        "description": "A finales de verano, se pueden ver grupos de Staryu en la orilla de la playa sincronizando el brillo de sus núcleos a ritmo regular.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 121,
        "num": "121",
        "name": "Starmie",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/121.png",
        "description": "Su órgano central, conocido como núcleo, brilla con los colores del arcoíris cuando se dispone a liberar sus potentes poderes psíquicos.",
        "type": [
          "water",
          "psychic"
        ]
      }, {
        "idPkm": 122,
        "num": "122",
        "name": "Mr. Mime",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/122.png",
        "description": "Muchos estudiosos sostienen que el desarrollo de sus enormes manos se debe a su afán por practicar la pantomima.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 123,
        "num": "123",
        "name": "Scyther",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/123.png",
        "description": "Sus guadañas se vuelven más afiladas con cada combate. Es capaz de rebanar troncos gruesos de un tajo.",
        "type": [
          "bug",
          "flying"
        ]
      }, {
        "idPkm": 124,
        "num": "124",
        "name": "Jynx",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/124.png",
        "description": "En cierta parte de Galar se conocía a Jynx como la Reina del Hielo y se reverenciaba con cierto temor.",
        "type": [
          "ice",
          "psychic"
        ]
      }, {
        "idPkm": 125,
        "num": "125",
        "name": "Electabuzz",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/125.png",
        "description": "Es habitual que las centrales eléctricas cuenten con Pokémon de tipo Tierra para hacer frente a los Electabuzz ávidos de electricidad.",
        "type": [
          "electric"
        ]
      }, {
        "idPkm": 126,
        "num": "126",
        "name": "Magmar",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/126.png",
        "description": "Abate a sus presas con las llamas que genera y con frecuencia acaba reduciéndolas a carbonilla por accidente.",
        "type": [
          "fire"
        ]
      }, {
        "idPkm": 127,
        "num": "127",
        "name": "Pinsir",
        "stock": 10,
        "price": 2000,
        "img": "http://www.serebii.net/pokemongo/pokemon/127.png",
        "description": "Los Pinsir se juzgan entre ellos por la robustez de la cornamenta. Cuanto más imponente sea, más agradará a sus congéneres del sexo opuesto.",
        "type": [
          "bug"
        ]
      }, {
        "idPkm": 128,
        "num": "128",
        "name": "Tauros",
        "stock": 10,
        "price": 2900,
        "img": "http://www.serebii.net/pokemongo/pokemon/128.png",
        "description": "Conviene tener cuidado si empieza a fustigarse con las colas, pues es señal de que va a cargar a máxima velocidad.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 129,
        "num": "129",
        "name": "Magikarp",
        "stock": 10,
        "price": 500,
        "img": "http://www.serebii.net/pokemongo/pokemon/129.png",
        "description": "Es el Pokémon más débil y patético que existe, con una fuerza y velocidad prácticamente nulas.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 130,
        "num": "130",
        "name": "Gyarados",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/130.png",
        "description": "Es exageradamente agresivo. El Hiperrayo que lanza por la boca reduce a cenizas todo lo que encuentra.",
        "type": [
          "water",
          "flying"
        ]
      }, {
        "idPkm": 131,
        "num": "131",
        "name": "Lapras",
        "stock": 10,
        "price": 4000,
        "img": "http://www.serebii.net/pokemongo/pokemon/131.png",
        "description": "Este Pokémon posee una notable inteligencia y un corazón de oro. Entona un canto melodioso mientras surca el mar.",
        "type": [
          "water",
          "ice"
        ]
      }, {
        "idPkm": 132,
        "num": "132",
        "name": "Ditto",
        "stock": 10,
        "price": 4000,
        "img": "http://www.serebii.net/pokemongo/pokemon/132.png",
        "description": "Redistribuye las células de su cuerpo para cobrar la apariencia de lo que ve, pero vuelve a la normalidad al relajarse.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 133,
        "num": "133",
        "name": "Eevee",
        "stock": 10,
        "price": 1000,
        "img": "http://www.serebii.net/pokemongo/pokemon/133.png",
        "description": "Es capaz de alterar la composición de su cuerpo para adaptarse al entorno.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 134,
        "num": "134",
        "name": "Vaporeon",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/134.png",
        "description": "Cuando las aletas de Vaporeon comienzan a vibrar, significa que lloverá en las próximas horas.",
        "type": [
          "water"
        ]
      }, {
        "idPkm": 135,
        "num": "135",
        "name": "Jolteon",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/135.png",
        "description": "Si se enfada o asusta, se le eriza el pelaje. Cada uno de sus pelos se convierte en una afilada púa que hace trizas al rival.",
        "type": [
          "electric"
        ]
      }, {
        "idPkm": 136,
        "num": "136",
        "name": "Flareon",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/136.png",
        "description": "Una vez que ha almacenado el calor suficiente, puede alcanzar una temperatura de 900 ºC.",
        "type": [
          "fire"
        ]
      }, {
        "idPkm": 137,
        "num": "137",
        "name": "Porygon",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/137.png",
        "description": "Se trata del primer Pokémon del mundo creado a partir de códigos de programación gracias al uso de tecnología de vanguardia.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 138,
        "num": "138",
        "name": "Omanyte",
        "stock": 10,
        "price": 1500,
        "img": "http://www.serebii.net/pokemongo/pokemon/138.png",
        "description": "Varios ejemplares han escapado o bien han sido liberados tras su restauración, lo que comienza a suscitar una serie de problemas.",
        "type": [
          "rock",
          "water"
        ]
      }, {
        "idPkm": 139,
        "num": "139",
        "name": "Omastar",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/139.png",
        "description": "Se cree que se extinguió porque el excesivo tamaño y peso de su concha le impedían moverse con rapidez para capturar presas.",
        "type": [
          "rock",
          "water"
        ]
      }, {
        "idPkm": 140,
        "num": "140",
        "name": "Kabuto",
        "stock": 10,
        "price": 1500,
        "img": "http://www.serebii.net/pokemongo/pokemon/140.png",
        "description": "Un Pokémon casi extinto. Cada tres días, muda el caparazón, que se va endureciendo de forma progresiva.",
        "type": [
          "rock",
          "water"
        ]
      }, {
        "idPkm": 141,
        "num": "141",
        "name": "Kabutops",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/141.png",
        "description": "Despedaza a las presas que atrapa para sorber sus fluidos y deja los restos para que otros Pokémon den buena cuenta de ellos.",
        "type": [
          "rock",
          "water"
        ]
      }, {
        "idPkm": 142,
        "num": "142",
        "name": "Aerodactyl",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/142.png",
        "description": "Un feroz Pokémon de la época prehistórica al que no bastan todos los avances tecnológicos actuales para regenerar a la perfección.",
        "type": [
          "rock",
          "flying"
        ]
      }, {
        "idPkm": 143,
        "num": "143",
        "name": "Snorlax",
        "stock": 10,
        "price": 3600,
        "img": "http://www.serebii.net/pokemongo/pokemon/143.png",
        "description": "No se encuentra satisfecho hasta haber ingerido 400 kg de comida cada día. Cuando acaba de comer, se queda dormido.",
        "type": [
          "normal"
        ]
      }, {
        "idPkm": 144,
        "num": "144",
        "name": "Articuno",
        "stock": 0,
        "price": 6000,
        "img": "http://www.serebii.net/pokemongo/pokemon/144.png",
        "description": "Se dice que sus bellas alas azules se componen de hielo. Vuela en torno a las montañas nevadas con su larga cola al viento.",
        "type": [
          "ice",
          "flying"
        ]
      }, {
        "idPkm": 145,
        "num": "145",
        "name": "Zapdos",
        "stock": 0,
        "price": 6000,
        "img": "http://www.serebii.net/pokemongo/pokemon/145.png",
        "description": "Posee el poder de controlar la electricidad a su antojo. Según la creencia popular, anida oculto en oscuros nubarrones de tormenta.",
        "type": [
          "electric",
          "flying"
        ]
      }, {
        "idPkm": 146,
        "num": "146",
        "name": "Moltres",
        "stock": 0,
        "price": 6000,
        "img": "http://www.serebii.net/pokemongo/pokemon/146.png",
        "description": "Una de las aves legendarias. Al batir las alas, las llamas que las envuelven emiten un hermoso fulgor rojo.",
        "type": [
          "fire",
          "flying"
        ]
      }, {
        "idPkm": 147,
        "num": "147",
        "name": "Dratini",
        "stock": 10,
        "price": 3000,
        "img": "http://www.serebii.net/pokemongo/pokemon/147.png",
        "description": "Habita en orillas junto a fuertes corrientes de agua, como bajo cascadas. Muda la piel una y otra vez a medida que crece.",
        "type": [
          "dragon"
        ]
      }, {
        "idPkm": 148,
        "num": "148",
        "name": "Dragonair",
        "stock": 10,
        "price": 4000,
        "img": "http://www.serebii.net/pokemongo/pokemon/148.png",
        "description": "Vive en lagos y mares de aguas cristalinas. Su poder para controlar el clima le permite alzar el vuelo llevado por el viento.",
        "type": [
          "dragon"
        ]
      }, {
        "idPkm": 149,
        "num": "149",
        "name": "Dragonite",
        "stock": 10,
        "price": 6000,
        "img": "http://www.serebii.net/pokemongo/pokemon/149.png",
        "description": "Un Pokémon bondadoso y compasivo al que le resulta imposible dar la espalda a Pokémon o humanos que se encuentren a la deriva.",
        "type": [
          "dragon",
          "flying"
        ]
      }, {
        "idPkm": 150,
        "num": "150",
        "name": "Mewtwo",
        "stock": 0,
        "price": 10000,
        "img": "http://www.serebii.net/pokemongo/pokemon/150.png",
        "description": "Su ADN es casi el mismo que el de Mew. Sin embargo, su tamaño y carácter son muy diferentes.",
        "type": [
          "psychic"
        ]
      }, {
        "idPkm": 151,
        "num": "151",
        "name": "Mew",
        "stock": 0,
        "price": 15000,
        "img": "http://www.serebii.net/pokemongo/pokemon/151.png",
        "description": "Si se observa a través de un microscopio, puede distinguirse cuán corto, fino y delicado es el pelaje de este Pokémon.",
        "type": [
          "psychic"
        ]
      }
    
    ]

    let itemsCollectioRef = collection(db, "pokemons")
    for(let pkm of data){
      let newPkm = await addDoc(itemsCollectioRef, pkm)
      console.log("documento creado:",newPkm.id)
    }
  }
  */

  export default FirebaseApp
