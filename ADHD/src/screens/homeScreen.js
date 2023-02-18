import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomModal from "../components/modal/CustomModal";

const HomeScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={styles.container}>
			<Pressable onPress={() => setModalVisible(true)}>
				<Text style={styles.start}>start</Text>
			</Pressable>

			<CustomModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	start: {
		backgroundColor: "lightgreen",
		paddingVertical: 16,
		paddingHorizontal: 25,
		fontSize: 20,
	},
});

export default HomeScreen;
