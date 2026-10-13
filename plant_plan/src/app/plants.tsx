import { Platform, Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";


export default function Plants() {
    const plantStatus = [
        { id: 1, icon: "water", status: "needs_water" },
        { id: 2, icon: null, status: "OK" },
    ];
    const plantsArray = [
        {
            id: 1,
            name: "Rose",
            description: "A beautiful red rose",
            status: "needs_water",
        },
        {
            id: 2,
            name: "Tulip",
            description: "A vibrant yellow tulip",
            status: "OK",
        },
    ];
    return (
    <ScrollView style={styles.scrollView}>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <View  style={styles.linkButton}>
          <Text>My Plants</Text>
        </View>
        <View style={styles.plantContainer}>
            {plantsArray.map((plant) => (
                <View key={plant.id} style={styles.plantUnit}>
                    <Text>{plant.name}</Text>
                    <Text>{plant.description}</Text>
                    <Text>{(() => {
  const status = plantStatus.find(
    (s) => s.status === plant.status
  );

  return status?.icon ? (
    <Ionicons
      name={status.icon}
      size={20}
      color="#27273c"
    />
  ) : null;
})()}</Text>
                </View>  
            ))}
            <View key="new-plant" style={styles.addPlantUnit}>
                <Text>Add plant</Text>  
            </View>  
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  plantContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantUnit: {
    width: '90%',
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  addPlantUnit: {
    backgroundColor: '#d0f0c0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 25,
  },
}); 