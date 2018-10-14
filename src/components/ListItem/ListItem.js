import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { removeFromList } from '../../actions';
import Button from '../../components/Button';
import { getGenreName, formatRuntime, truncateText } from '../../utils'

import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';
import {Image as faImage} from 'styled-icons/fa-regular/Image';
import {Close as mdClose} from 'styled-icons/material/Close';
import {Clock as faClock} from 'styled-icons/fa-regular/Clock';
import ImdbIcon from '../../components/BrandIcon/ImdbIcon';
import RtFreshIcon from '../../components/BrandIcon/RtFreshIcon';
import RtRottenIcon from '../../components/BrandIcon/RtRottenIcon';

// TODO: Add viewing options
// TODO: Add responsive styles
// TODO: fix bug that prevents truncation (componentDidMount)

const IconClock = styled(faClock)`
  width: 12px;
  margin-right: 2px;
`

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
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 8px;
`

const YearSpan = styled.span`
  font-weight: 400;
  padding: 0 10px;
  color: ${colors.subtitle.MEDIUM};
`

const GenresContainer = styled.span`
  color: ${colors.subtitle.MEDIUM};
  font-size: 12px;
  padding-top: 6px;
  padding-bottom: 8px;
`

const Genre = styled.span`
  color: ${colors.WHITE};
  border-radius: 4px;
  padding: 2px 5px;
  margin-right: 6px;
  background: linear-gradient(to bottom, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 9px;
  letter-spacing: .5px;
`

const Synopsis = styled.p`
  color: ${colors.BLACK};
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  margin-top: 5px;
`

const MetaContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${colors.subtitle.MEDIUM};
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  
  img {
    padding-right: 6px;
  }
`

const Meta = styled.span`
  color: ${colors.subtitle.MEDIUM};
  font-size: 12px;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 4px;
  font-weight: 400;
  margin-left: 6px;
`

const NoRatings = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`

const ControlsContainer = styled.div`
  padding: 24px;
`

class ListItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      isTitleOverflowing: false
    }

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentDidMount(){
    this.setState({ isTitleOverflowing: findDOMNode(this.titleNode).getBoundingClientRect().height > 30});
  }

  handleRemoveClick(removeFromListItem) {
    const { removeFromList } = this.props;
    removeFromList(removeFromListItem);
  };

  render() {
    const { item } = this.props;
    const { isTitleOverflowing } = this.state;
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
            <span ref={el => this.titleNode = el}>{item.title}</span>
            <YearSpan>
              {item.year ? `(${item.year})` : '(TBA)'}
            </YearSpan>
          </Title>
          <GenresContainer>            
              {/* Slice the array into only 3 genres for better UI */}
              {item.genres.slice(0, 3).map(genre =>
                <Genre key={genre}>
                  {getGenreName(genre, item.media_type)}
                </Genre>
              )}
          </GenresContainer>
          <Synopsis>
            {isTitleOverflowing ? truncateText(item.synopsis, 170) : truncateText(item.synopsis, 230)}
            {item.synopsis.length > 175 && '...'}
          </Synopsis>
          <MetaContainer>
            {            
              imdbScore || rtScore ?
                <Fragment>
                  {imdbScore &&
                    <Rating>
                      <ImdbIcon size={15} />{imdbScore.toFixed(1)}
                    </Rating>
                  }
                  {rtScore &&
                    (rtScore >= 60 ?
                      <Rating>
                        <RtFreshIcon size={15} />{rtScore}{'%'}
                      </Rating> :
                      <Rating>
                        <RtRottenIcon size={15} />{rtScore}{'%'}
                      </Rating>
                    )
                  }
                </Fragment> :
                <NoRatings>Ratings Not Available</NoRatings>
            }
            {convertedRuntime &&
              <Meta>
                <IconClock title="Runtime"/>
                {`${convertedRuntime.hours}h ${convertedRuntime.minutes}mins`}
              </Meta>
            }
          </MetaContainer>
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