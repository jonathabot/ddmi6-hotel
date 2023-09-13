import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { RadioButton, Switch } from 'react-native-paper';

export default function App() {
  const [diaria, setDiaria] = React.useState(0);
  const [isCafeDaManhaOn, setIsCafeDaManhaOn] = React.useState(false);
  const [isAlmocoOn, setIsAlmocoOn] = React.useState(false);
  const [isJantarOn, setIsJantarOn] = React.useState(false);
  const [apartamento, setApartamento] = React.useState('');
  const [hospedes, setHospedes] = React.useState('1');
  const [fontsLoaded] = useFonts({
    Cabin: require('./assets/font/Cabin.ttf'),
  });

  const onToggleSwitchCafeDaManha = () => setIsCafeDaManhaOn(!isCafeDaManhaOn);

  const onToggleSwitchAlmoco = () => setIsAlmocoOn(!isAlmocoOn);

  const onToggleSwitchJantar = () => setIsJantarOn(!isJantarOn);

  React.useEffect(() => {
    let diariaApartamentoMultHospedes = 0;
    let diariaValor = 0;

    if (apartamento == 'standard') {
      diariaApartamentoMultHospedes = 145;
    }
    if (apartamento == 'confort') {
      diariaApartamentoMultHospedes = 225;
    }
    if (apartamento == 'premium') {
      diariaApartamentoMultHospedes = 485;
    }

    if (diariaApartamentoMultHospedes > 0) {
      diariaValor += diariaApartamentoMultHospedes;
    }

    if (diariaApartamentoMultHospedes > 0 && hospedes == 2) {
      diariaValor += diariaApartamentoMultHospedes * 0.5;
    }

    if (diariaApartamentoMultHospedes > 0 && hospedes == 3) {
      diariaValor += diariaApartamentoMultHospedes * 0.8;
    }

    if (isCafeDaManhaOn == true) {
      diariaValor += 47 * hospedes;
    }

    if (isAlmocoOn == true) {
      diariaValor += 72 * hospedes;
    }

    if (isJantarOn == true) {
      diariaValor += 56 * hospedes;
    }

    setDiaria(diariaValor);
  }, [hospedes, isCafeDaManhaOn, isAlmocoOn, isJantarOn, apartamento]);

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}> Hotel DDMI6</Text>
        <View style={styles.divGroup}>
          <Text>Selecione o quarto desejado:</Text>
          <RadioButton.Group
            onValueChange={(value) => setApartamento(value)}
            value={apartamento}
            style={styles.radioButtonGroup}>
            <RadioButton.Item
              label="Apartamento Standard"
              value="standard"
              style={styles.radioButtonItem}
            />
            <RadioButton.Item
              label="Apartamento Confort"
              value="confort"
              style={styles.radioButtonItem}
            />
            <RadioButton.Item
              label="Apartamento Premium"
              value="premium"
              style={styles.radioButtonItem}
            />
          </RadioButton.Group>
        </View>
        <View style={styles.divGroup}>
          <Text>Quantos hospedes?</Text>
          <RadioButton.Group
            onValueChange={(value) => setHospedes(value)}
            value={hospedes}
            style={styles.radioButtonGroup}>
            <RadioButton.Item
              label="1"
              value="1"
              checked="checked"
              style={styles.radioButtonItem}
            />
            <RadioButton.Item
              label="2"
              value="2"
              style={styles.radioButtonItem}
            />
            <RadioButton.Item
              label="3"
              value="3"
              style={styles.radioButtonItem}
            />
          </RadioButton.Group>
        </View>
        <View style={styles.divGroup}>
          <Text>Deseja adicionais?</Text>
          <View style={styles.adicionalSwitchButton}>
            <Text style={styles.switchText}>Café da Manhã</Text>
            <Switch
              value={isCafeDaManhaOn}
              onValueChange={onToggleSwitchCafeDaManha}
              style={{ marginLeft: '10px' }}
            />
          </View>
          <View style={styles.adicionalSwitchButton}>
            <Text style={styles.switchText}>Almoço</Text>
            <Switch
              value={isAlmocoOn}
              onValueChange={onToggleSwitchAlmoco}
              style={{ marginLeft: '10px' }}
            />
          </View>
          <View style={styles.adicionalSwitchButton}>
            <Text style={styles.switchText}>Jantar</Text>
            <Switch
              value={isJantarOn}
              onValueChange={onToggleSwitchJantar}
              style={{ marginLeft: '10px' }}
            />
          </View>
        </View>
        <View style={styles.showFinalValue}>
          <Text>Sua diaria sairia no valor de:</Text>
          <Text style={styles.textFinalValue}>R${diaria}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Cabin',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1677ff',
    height: '100%',
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: '40px',
    marginTop: '10%',
    color: 'white',
  },

  divGroup: {
    fontFamily: 'Cabin',
    backgroundColor: '#d5e0d8',
    padding: '5%',
    borderRadius: '10px',
    width: '70%',
    height: 'auto',
    marginBottom: '10px',
  },

  radioButtonGroup: {
    display: 'flex',
    height: 'auto',
    justifyContent: 'space-between',
  },

  radioButtonItem: {
    backgroundColor: '#2f2e2e10',
    borderRadius: '10px',
    marginTop: '5%',
    textAlign: 'center',
  },

  adicionalSwitchButton: {
    display: 'flex',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px',
  },

  switchText: {
    marginRight: '0,3%',
  },

  showFinalValue: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#d5e0d8',
    padding: '5%',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '10px',
    width: '70%',
    marginBottom: '10px',
  },

  textFinalValue: { fontSize: '40px', fontWeight: 'bold' },
});
