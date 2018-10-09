import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeFromList } from '../../actions';
import { getGenreName, formatRuntime } from '../../utils'

import styled from 'styled-components';
import {Image as faImage} from 'styled-icons/fa-regular/Image';
import {Close as mdClose} from 'styled-icons/material/Close';
import ImdbIcon from '../../components/BrandIcon/ImdbIcon';
import RtFreshIcon from '../../components/BrandIcon/RtFreshIcon';
import RtRottenIcon from '../../components/BrandIcon/RtRottenIcon';
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
  img {
    max-height: 100%;
  }
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

const IconClose = styled(mdClose)`
  width: 30px;
`

const InformationContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 28px 30px;
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
  color: ${colors.subtitle.MEDIUM};
  font-size: 12px;
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
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  margin-top: 5px;
`

const Ratings = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${colors.subtitle.MEDIUM};
  div {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  img {
    padding-right: 6px;
  }
`

const NoRatings = styled.span`
  font-size: 12px;
`

const ControlsContainer = styled.div`
  padding: 24px;
`

class ListItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      error: null
    }
  }

  handleRemoveClick = removeFromListItem => {
    const { removeFromList } = this.props;
    removeFromList(removeFromListItem);
  };

  render() {
    const { item } = this.props;
    const convertedRuntime = item.runtime ? formatRuntime(item.runtime) : null;
    
    // Check to see whether score provider object exists and get the index
    const imdbScoreObj = item.ratings[item.ratings.findIndex(rating => rating.provider_type === 'imdb:score')];
    const rtScoreObj = item.ratings[item.ratings.findIndex(rating => rating.provider_type === 'tomato:meter')];
    const imdbScore = imdbScoreObj && imdbScoreObj.value;
    const rtScore = rtScoreObj && rtScoreObj.value;
    

    return (
      <ListItemWrapper>
        {item.poster ? 
          <img
            src = {`https://images.justwatch.com${item.poster}s166`}
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
              {item.year ? `(${item.year})` : '(TBA)'}
            </YearSpan>
          </Title>
          <MetaSpan>
            <span>
              {/* Slice the array into only 3 genres for better Ui, put a comma after every genre except the last on the list */}
              {item.genres.slice(0, 3).map((genre, index, genres) => 
                (index !== genres.slice(0, 3).length - 1) ?
                `${getGenreName(genre, item.media_type)}, ` :
                getGenreName(genre, item.media_type)
              )}
            </span>
            {convertedRuntime && `|`}
            <span>
              {convertedRuntime && `${convertedRuntime.hours}h ${convertedRuntime.minutes}mins`}
            </span>
          </MetaSpan>
          <Synopsis>
            {item.synopsis.length > 160 ? `${item.synopsis.substring(0, 175)}—` : item.synopsis}
          </Synopsis>
          <Ratings>
            {            
              imdbScore || rtScore ?
                <Fragment>
                  {imdbScore &&
                    <div>
                      <ImdbIcon size={15} />{imdbScore}
                    </div>
                  }
                  {rtScore &&
                    (rtScore >= 60 ?
                      <div>
                        <RtFreshIcon size={15} />{rtScore}{'%'}
                      </div> :
                      <div>
                        <RtRottenIcon size={15} />{rtScore}{'%'}
                      </div>
                    )
                  }
                </Fragment> :
                <NoRatings>Ratings Not Available</NoRatings>
            }
          </Ratings>
        </InformationContainer>
        <ControlsContainer>
          <Button
            category='icon'
            danger
            onClick={() => this.handleRemoveClick(item)}
          >
            <IconClose title='Remove from List' />
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