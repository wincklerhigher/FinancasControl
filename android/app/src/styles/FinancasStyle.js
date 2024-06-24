import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  transactionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionInfo: {
    flexDirection: 'column',    
  },
  descriptionText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  amountText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  dashboardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dashboardButton: {
    backgroundColor: '#808080', 
    borderRadius: 25, 
    marginBottom: 13,
    width: windowWidth - 40,
    height: 45, 
    justifyContent: 'center', 
    alignItems: 'center',         
  },
  dashboardButtonText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',    
  },
  iconStyle: {
    marginRight: 10, 
  },  
  cardContentWithMargin: {
    marginTop: 20, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default styles;