import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Alert, StyleSheet, Modal, Text, TouchableOpacity, View, Button, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoApi, updateTodoApi, fetchTodos, addTodoAPI } from '../redux/actions/todoAction';
import Banner from '../component/banner';
import TextInputCustoms from '../component/textinput';
import * as ImagePicker from 'react-native-image-picker';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [id, setId] = useState('');
    const [update, setUpdate] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const listTodo = useSelector(state => state.todos.listTodo);
    const dispatch = useDispatch();
    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);
    const offset = useSharedValue(10);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    React.useEffect(() => {
        offset.value = withRepeat(withSpring(-offset.value), -1, true);
    }, []);

    const handlePressIn = () => {
        scale.value = withSpring(0.7);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const animatedStyleButton = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 5000 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const openDetailModal = (item) => {
        setSelectedStudent(item);
        setDetailModalVisible(true);
    };

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <Banner uri={"https://dichvuphotoshop.net/wp-content/uploads/2021/03/banner-dep.jpg"} />
            <View style={{ flex: 1, padding: 10, backgroundColor: '#2ecc71' }}>
                <Animated.Text
                    style={[
                        { fontWeight: 'bold', fontSize: 30, color: 'white', marginBottom: 10 },
                        animatedStyle,
                    ]}
                >
                    Danh sách sinh viên
                </Animated.Text>
                <FlatList
                    data={listTodo}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => openDetailModal(item)}
                                style={{ width: '100%', padding: 10, height: 240, marginBottom: 10, flexDirection: 'row', backgroundColor: 'white', borderRadius: 10 }}
                            >
                                {/* Existing student item view */}
                                <View style={{ flex: 1, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 100, height: 100, backgroundColor: 'red', borderRadius: 10 }}
                                        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg' }}
                                    />
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>
                                        Mã sinh viên: {item.ma_sinh_vien_ph42448}
                                    </Text>
                                    <Text>
                                        Tên: {item.ten_ph42448}
                                    </Text>
                                    <Text>
                                        Giới tính: {item.gioi_tinh_ph42448}
                                    </Text>
                                    <Text>
                                        Ngày sinh: {item.ngay_sinh_ph42448}
                                    </Text>
                                    <Text>
                                        Email: {item.email_ph42448}
                                    </Text>
                                    <Text>
                                        Số điện thoại: {item.so_dien_thoai_ph42448}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa bản ghi này không ?', [
                                                {
                                                    text: 'Hủy',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Xóa',
                                                    onPress: () => {
                                                        dispatch(deleteTodoApi(item.id))
                                                            .then(() => {
                                                                ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
                                                            })
                                                            .catch((error) => {
                                                                console.error('Error deleting todo:', error);
                                                            });
                                                    },
                                                },
                                            ]);
                                        }}
                                    >
                                        <Text style={{ color: 'red', marginRight: 10 }}>
                                            Xóa
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setUpdate(true);
                                            setId(item.id);
                                            setMa(item.ma_sinh_vien_ph42448);
                                            setTen(item.ten_ph42448);
                                            setGioiTinh(item.gioi_tinh_ph42448);
                                            setNgaySinh(item.ngay_sinh_ph42448);
                                            setEmail(item.email_ph42448);
                                            setSdt(item.so_dien_thoai_ph42448);
                                            setModalVisible(true);
                                        }}
                                    >
                                        <Text style={{ color: 'blue' }}>
                                            Sửa
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                {/* Add Student Button */}
                <AnimatedTouchableOpacity
                    onPress={() => {
                        setUpdate(false);
                        setId('');
                        setMa('');
                        setTen('');
                        setGioiTinh('');
                        setNgaySinh('');
                        setEmail('');
                        setSdt('');
                        setModalVisible(true);
                    }}
                    style={[
                        {
                            position: 'absolute',
                            end: 40,
                            bottom: 40,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                        animatedStyles,
                    ]}
                >
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>+</Text>
                </AnimatedTouchableOpacity>

                {/* Detail Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={detailModalVisible}
                    onRequestClose={() => {
                        setDetailModalVisible(false);
                    }}
                >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 350, height: 450, borderRadius: 20, justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Chi tiết sinh viên</Text>
                            {selectedStudent && (
                                <View>
                                    <Text>Mã sinh viên: {selectedStudent.ma_sinh_vien_ph42448}</Text>
                                    <Text>Tên: {selectedStudent.ten_ph42448}</Text>
                                    <Text>Giới tính: {selectedStudent.gioi_tinh_ph42448}</Text>
                                    <Text>Ngày sinh: {selectedStudent.ngay_sinh_ph42448}</Text>
                                    <Text>Email: {selectedStudent.email_ph42448}</Text>
                                    <Text>Số điện thoại: {selectedStudent.so_dien_thoai_ph42448}</Text>
                                </View>
                            )}
                            <Button
                                title="Đóng"
                                onPress={() => setDetailModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    bannerCss: {
        width: '100%',
        height: 200,
    },
});
