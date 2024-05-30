import { 
    View, 
    Text, 
    Image, 
    StyleSheet,
    SafeAreaView,
    Animated,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';

const DetectionDetail = () => {
    const route = useRoute();
    const { data, imageUri } = route.params; // Destructure imageUri from route params
    const [fadeAnim] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView>
            {data && (
                <ScrollView>
                    <View style={styles.imageContainer}>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color={COLORS.primary}
                                style={styles.activityIndicator}
                            />
                        )}
                        <Image
                            style={styles.image}
                            source={{ uri: imageUri || 'https://via.placeholder.com/150' }}
                            onLoad={() => setLoading(false)}
                        />
                    </View>

                    <View style={styles.detailsContainer}>            
                        <Text style={styles.headerText}>Detail Result:</Text>
                        {/* ID Box */}
                        <View style={styles.detailRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelText}>Plants ID </Text>
                            </View>
                            <View style={styles.separator}>
                                <Text style={styles.labelText}>: </Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueText}>{data.id}</Text>
                            </View>
                        </View>
                        {/* Timestamp Box */}
                        <View style={styles.detailRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelText}>Timestamp </Text>
                            </View>
                            <View style={styles.separator}>
                                <Text style={styles.labelText}>: </Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueText}>{data.timestamp}</Text>
                            </View>
                        </View>
                        {/* Confidence Box */}
                        <View style={styles.detailRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelText}>Confidence </Text>
                            </View>
                            <View style={styles.separator}>
                                <Text style={styles.labelText}>: </Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueText}>{data.confidence}</Text>
                            </View>
                        </View>
                        {/* Class Box */}
                        <Animated.View style={[
                            styles.containerAnim,
                            { opacity: fadeAnim },
                            data.class === 'Melon Sehat' ? { backgroundColor: COLORS.greenOcean, borderColor: COLORS.greenBamboo } : null
                        ]}>
                            <Text style={[
                                styles.predictText,
                                data.class === 'Melon Sehat' ? { color: COLORS.lightWhite } : null
                            ]}>Data Result</Text>
                            <Text style={[
                                styles.descriptionText,
                                data.class === 'Melon Sehat' ? { color: COLORS.lightWhite } : null
                            ]}>
                                {data.class === 'Melon Sehat'
                                    ? `Panen melon terbaru! 🌱✨ Prediksi: "${data.class}" dengan nilai ${data.confidence}%. Rawat dengan kasih, dapatkan panen berkualitas! 🍈🌿`
                                    : data.class === 'Melon Sakit'
                                    ? `Tanaman melon sakit. 🥀 Prediksi: "${data.class}" dengan keyakinan ${data.confidence}%. Segera konsultasi ahli pertanian untuk solusi terbaik. 🍈🌱 #MelonSakit #PerawatanCerdas`
                                    : null}
                            </Text>
                        </Animated.View>
                    </View> 
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default DetectionDetail;

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width,
        height: SIZES.height / 2,
    },
    activityIndicator: {
        position: 'absolute',
        zIndex: 1,
    },
    image: {
        width: SIZES.width,
        height: SIZES.height / 2,
        resizeMode: 'cover',
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 5,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 0,
    },
    headerText: {
        fontFamily: 'bold',
        fontSize: 18,
        color: COLORS.greenBamboo,
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    labelContainer: {
        width: '28%',
    },
    separator: {
        width: '7%',
    },
    valueContainer: {
        width: '65%',
    },
    labelText: {
        fontFamily: 'semibold',
        fontSize: 14,
        color: COLORS.black,
    },
    valueText: {
        fontFamily: 'semibold',
        fontSize: 14,
        color: COLORS.black,
    },
    containerAnim: {
        padding: 20,
        backgroundColor: '#f8d7da',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9534f',
    },
    predictText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#721c24',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#721c24',
        fontStyle: 'italic',
    },
});
