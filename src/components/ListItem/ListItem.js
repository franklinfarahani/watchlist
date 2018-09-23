import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromList } from '../../actions';
import { getGenreName, formatDate } from '../../utils'

import styled from 'styled-components';
import {Image as faImage} from 'styled-icons/fa-regular/Image';
import { colors, shadows } from '../../config/styleVariables';
import Button from '../../components/Button';

const ListItemWrapper = styled.li`
  background: ${colors.WHITE};
  list-style-type: none;
  display: flex;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
`

const EmptyImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 231px;
  width: 154px;
  background: ${colors.bg.MEDIUM};
`

const IconImage = styled(faImage)`
  color: ${colors.subtitle.MEDIUM};
  width: 60px;
`

const InformationContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 30px;
`

const Title = styled.h3`
  font-size: 26px;
  font-weight: 600;
  padding-bottom: 8px;
`

const YearSpan = styled.span`
  font-weight: 400;
  padding: 0 10px;
  color: ${colors.subtitle.MEDIUM};
`

const MetaSpan = styled.span`
  color: ${colors.subtitle.LIGHT};
  font-size: 13px;
  padding-bottom: 8px;
  
  & span:first-child {
    padding-right: 10px;
  }

  & span:last-child {
    padding-left: 10px;
  }
`

const Synopsis = styled.p`
  color: ${colors.BLACK};
  font-size: 15px;
  line-height: 20px;
  flex: 1;
`

const Ratings = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${colors.subtitle.MEDIUM};
`

const ControlsContainer = styled.div`
  padding: 24px;
`

class ListItem extends Component {
  handleRemoveClick = removeFromListId => {
    const { removeFromList, auth } = this.props;
    removeFromList(removeFromListId, auth.user.uid);
  };

  render() {
    const { itemId, item } = this.props;
    const convertedDate = formatDate(item.year);
    return (
      <ListItemWrapper>
        {item.poster ? 
          <img
            src = {`http://image.tmdb.org/t/p/w154${item.poster}`}
            alt = {`poster preview for ${item.title}`}
          />
          :
          <EmptyImage>
            <IconImage title='No Image Icon' />
          </EmptyImage>
        }
        <InformationContainer>
          <Title>
            {item.title}
            <YearSpan>
              {item.year ? '(' + convertedDate.year + ')' : '(TBA)'}
            </YearSpan>
          </Title>
          <MetaSpan>
            <span>
              {/* Put a comma after every genre except the last on the list */}
              {item.genre_ids.map((genre, index, genre_ids) => 
                (index !== genre_ids.length - 1) ?
                `${getGenreName(genre, item.media_type)}, ` :
                getGenreName(genre, item.media_type)
              )}
            </span>
            {`|`}
            <span>
              {
                item.year ?
                `${convertedDate.day} ${convertedDate.month} ${convertedDate.year}` :
                'Unknown Date'
              }
            </span>
          </MetaSpan>
          <Synopsis>
            {item.synopsis.length > 160 ? `${item.synopsis.substring(0, 160)}...` : item.synopsis}
          </Synopsis>
          <Ratings>
            IMDB and RottenTomatos
          </Ratings>
        </InformationContainer>
        <ControlsContainer>
          <Button
            category='pill'
            onClick={() => this.handleRemoveClick(itemId)}
          >
            Remove
          </Button>
        </ControlsContainer>
        
      </ListItemWrapper>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { removeFromList })(ListItem);