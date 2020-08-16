import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    flex: 1,
    width: width * 0.89,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  detailView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingRight: width * 0.05,
    paddingLeft: width * 0.05,
    left: 0,
    height: 60,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
  cameraText: {
    color: "#fff",
    fontWeight: "600",
  },
  authorText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  controls: {
    flexDirection: "row",
  },
});
export default styles;
