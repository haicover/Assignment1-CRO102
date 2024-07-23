import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from '../Redux/Reducers/BookReducers';

const BookScreen = () => {
  const dispatch = useDispatch();
  const listBook = useSelector(state => state.listBook.listBook);
  const [content, setContent] = useState('');
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateText, setDateText] = useState('');
  const [editId, setEditId] = useState(null); // Changed from editIndex to editId for clarity

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString('en-GB');
    setDateText(formattedDate);
    hideDatePicker();
  };

  const handleAddEntry = () => {
    setContent('');
    setDateText('');
    setSelectedDate(new Date());
    setEditId(null);
    setModalAddVisible(true);
  };

  const handleSaveEntry = () => {
    if (content.trim()) {
      const newEntry = {
        title: content.trim(),
        date: selectedDate,
      };
      if (editId) {
        dispatch(updateBook({id: editId, ...newEntry}));
        setEditId(null);
      } else {
        dispatch(addBook(newEntry));
      }
      setContent('');
      setDateText('');
      setSelectedDate(new Date());
      setModalAddVisible(false);
      setModalEditVisible(false);
    }
  };

  const handleEditEntry = id => {
    const book = listBook.find(book => book.id === id);
    if (book) {
      setContent(book.title);
      setDateText(new Date(book.date).toLocaleDateString('en-GB'));
      setSelectedDate(new Date(book.date));
      setEditId(id);
      setModalEditVisible(true);
    }
  };

  const handleDeleteEntry = id => {
    Alert.alert('Xóa mục này', 'Bạn có chắc muốn xóa mục này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => dispatch(deleteBook(id)),
      },
    ]);
  };

  const handleDateChange = text => {
    setDateText(text);
    const [day, month, year] = text.split('/').map(Number);
    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Viết lời biết ơn, hạnh phúc trong ngày</Text>
      <FlatList
        data={listBook}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.entryContainer}>
            <Text style={styles.entry}>{item.title}</Text>
            <Text style={styles.date}>
              {item.date ? new Date(item.date).toLocaleDateString('en-GB') : ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleEditEntry(item.id)}>
                <Text style={styles.buttonText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => handleDeleteEntry(item.id)}>
                <Text style={styles.buttonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleAddEntry} style={styles.addButton}>
        <Icon name="add" size={30} color="#FFf" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddVisible || modalEditVisible}
        onRequestClose={() => {
          setModalAddVisible(false);
          setModalEditVisible(false);
          setContent('');
          setDateText('');
          setSelectedDate(new Date());
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              {modalEditVisible ? 'Chỉnh sửa mục' : 'Thêm mục mới'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nhập nội dung"
              value={content}
              onChangeText={setContent}
            />
            <View style={styles.datePickerContainer}>
              <TextInput
                style={styles.modalInput}
                placeholder="Ngày/Tháng/Năm"
                value={dateText}
                onChangeText={handleDateChange}
              />
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.datePickerButton}>
                <Icon name="calendar-month" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.buttonThemHuy}
                onPress={() => {
                  setModalAddVisible(false);
                  setModalEditVisible(false);
                  setContent('');
                  setDateText('');
                  setSelectedDate(new Date());
                }}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonThemHuy}
                onPress={handleSaveEntry}>
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  entryContainer: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 7,
    padding: 10,
    backgroundColor: '#CCFFCC',
    flex: 1,
    margin: 10,
  },
  entry: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    marginStart: 10,
    marginEnd: 10,
    color: 'black',
  },
  addButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 4,
  },
  buttonDelete: {
    backgroundColor: 'red',
    marginStart: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonThemHuy: {
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    margin: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  modalInput: {
    width: 250,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  datePickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 15,
    marginStart: 10,
    borderRadius: 5,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  datePickerButtonText: {
    fontSize: 16,
  },
  date: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 14,
    color: '#888',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
});

export default BookScreen;
