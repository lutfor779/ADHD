import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};

const colors = [
	"#f44336",
	"#9c27b0",
	"#2196f3",
	// "#4caf50",
	// "#ffeb3b",
	// "#ff9800",
	// "#795548",
	// "#9e9e9e",
	// "#000000",
];

const MaxLimit = 5;

const CustomModal = ({ modalVisible, setModalVisible }) => {
	const [activeColor, setActiveColor] = useState(colors.random());
	const [previousColor, setPreviousColor] = useState(null);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [total, setTotal] = useState(0);

	const handlePress = async (answer) => {
		const getResult = () => {
			if (previousColor) {
				const result = previousColor === activeColor;
				if (result === answer) {
					setCorrectAnswers(correctAnswers + 1);
				} else {
					setCorrectAnswers(correctAnswers - 1);
				}
			}
		};
		if (total === MaxLimit) {
			setTotal(total + 1);
			getResult();
			setPreviousColor(null);
		} else {
			setTotal(total + 1);

			getResult();

			await setPreviousColor(activeColor);
			await setActiveColor(colors.random());
		}
	};

	const handleClose = () => {
		setTotal(0);
		setPreviousColor(null);
		setCorrectAnswers(0);
		setModalVisible(false);
	};

	return (
		<Modal
			animationType="slide"
			animationInTiming={13900}
			visible={modalVisible}
			animationOut="slide"
			swipeDirection="down"
			onRequestClose={() => {
				setModalVisible(false);
				setPreviousColor(null);
			}}
		>
			{total > MaxLimit ? (
				<View style={styles.container}>
					<View
						style={[styles.flexContainer, { flex: 1, flexDirection: "column" }]}
					>
						<Text style={[styles.text, { fontSize: 30 }]}>
							Correct = {correctAnswers > 0 ? correctAnswers : 0}
						</Text>
						<View style={styles.flexContainer}>
							<TouchableOpacity onPress={handleClose}>
								<Text style={styles.button}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			) : (
				<View style={styles.container}>
					<View style={{ flex: 1 }}>
						<Text style={styles.status}>
							{total} / {MaxLimit}
						</Text>

						<View style={[styles.flexContainer, { flex: 1 }]}>
							<View
								style={[
									styles.colorContainer,
									{ backgroundColor: activeColor },
								]}
							/>
						</View>
					</View>

					<View style={{ paddingBottom: 35 }}>
						{previousColor ? (
							<View>
								<Text style={styles.text}>
									Is this match with previous color?
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-around",
										alignItems: "center",
										marginTop: 30,
									}}
								>
									<TouchableOpacity onPress={() => handlePress(false)}>
										<Text style={styles.button}>No</Text>
									</TouchableOpacity>

									<TouchableOpacity onPress={() => handlePress(true)}>
										<Text style={styles.button}>Yes</Text>
									</TouchableOpacity>
								</View>
							</View>
						) : (
							<View style={styles.flexContainer}>
								<TouchableOpacity onPress={() => handlePress()}>
									<Text style={styles.button}>Remember this color</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},
	status: {
		marginTop: 50,
		fontSize: 20,
		textAlign: "right",
	},
	colorContainer: {
		height: 200,
		width: 200,
		marginTop: -80,
	},
	flexContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	text: { textAlign: "center", fontSize: 20 },
	button: {
		backgroundColor: "lightgreen",
		paddingVertical: 16,
		paddingHorizontal: 25,
		fontSize: 20,
	},
});

export default CustomModal;
