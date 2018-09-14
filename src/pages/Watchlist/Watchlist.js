import { connect } from 'react-redux';
import ToWatchList from '../../components/ToWatchList';

const mapStateToProps = state => {
  return {
    watchList: state.toWatch
  }
}

const Watchlist = connect(mapStateToProps)(ToWatchList);

export default Watchlist;