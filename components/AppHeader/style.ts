import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      color: COLORS.White,
      fontSize: FONTSIZE.size_24,
    },
    headerText: {
      flex: 1,
      fontSize: FONTSIZE.size_20,
      textAlign: 'center',
      color: COLORS.White,
    },
    emptyContainer: {
      height: SPACING.space_20 * 2,
      width: SPACING.space_20 * 2,
    },
    iconBG: {
      position: 'relative', 
      height: SPACING.space_20 * 2,
      width: SPACING.space_20 * 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDERRADIUS.radius_20,
      backgroundColor: COLORS.Orange,
      
    },
  });