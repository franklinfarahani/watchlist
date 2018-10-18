import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTitle } from '../../actions';
import Button from '../../components/Button';
import { getGenreName, formatRuntime, isEmpty } from '../../utils'

import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';
import {Image as faImage} from 'styled-icons/fa-regular/Image';
import {Clock as faClock} from 'styled-icons/fa-regular/Clock';
import {KeyboardBackspace as mdBack} from 'styled-icons/material/KeyboardBackspace';
import ImdbIcon from '../../components/BrandIcon/ImdbIcon';
import RtFreshIcon from '../../components/BrandIcon/RtFreshIcon';
import RtRottenIcon from '../../components/BrandIcon/RtRottenIcon';

// TODO: Add viewing options
// TODO: Add responsive styles

const IconBack = styled(mdBack)`
  color: ${colors.PRIMARY};
  width: 30px;
  margin-right: 4px;
`

const IconClock = styled(faClock)`
  width: 12px;
  margin-right: 2px;
`

const Header = styled.header`
  padding: 24px;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.subtitle.MEDIUM};
  text-transform: uppercase;
  margin-bottom: 6px;
  transition: .2s color;

  &:hover {
    color: ${colors.PRIMARY};
  }
`

const SingleWrapper = styled.li`
  background: ${colors.WHITE};
  list-style-type: none;
  display: flex;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  & > img {
    max-height: 100%;
    height: 33.34%;
    width: 33.34%;
  }
`

const EmptyImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 340.92px;
  width: 240.05px;
  background: ${colors.bg.MEDIUM};
`

const IconImage = styled(faImage)`
  color: ${colors.subtitle.MEDIUM};
  width: 60px;
`

const InformationContainer = styled.div`
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 28px 30px;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
`

const InfoUnit = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  align-content: flex-start;
`

const Label = styled.span`
  flex-basis: 100%;
  font-size: 11px;
  font-weight: 600;
  color: ${colors.subtitle.MEDIUM};
  text-transform: uppercase;
  margin-bottom: 6px;
`

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
`

const YearSpan = styled.span`
  font-size: 20px;
  font-weight: 400;
  padding: 0 10px;
  color: ${colors.subtitle.MEDIUM};
`

const GenresContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
`

const Genre = styled.span`
  color: ${colors.WHITE};
  border-radius: 4px;
  padding: 2.5px 5px;
  margin-bottom: 3px;
  margin-right: 3px;
  background: linear-gradient(to bottom, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 9.5px;
  letter-spacing: .5px;
`

const Runtime = styled.span`
  color: ${colors.subtitle.MEDIUM};
  font-size: 12px;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 4px;
  font-weight: 400;
`

const Synopsis = styled.p`
  color: ${colors.BLACK};
  font-size: 14px;
  line-height: 21px;
  flex: 1;
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

const NoRatings = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`

class Single extends Component {
  // constructor(props){
  //   super(props)
  // }

  componentDidMount(){
    const { getTitle } = this.props;
    const { params } = this.props.match;
    getTitle(params.id, params.mediaType)
  }

  render() {
    const { item } = this.props.single;
    if(isEmpty(item)) {
      return <div>loading</div>
    }

    const convertedRuntime = item.runtime ? formatRuntime(item.runtime) : null;
    
    // Check to see whether score provider object exists and get the index
    const imdbScoreObj = item.ratings[item.ratings.findIndex(rating => rating.provider_type === 'imdb:score')];
    const rtScoreObj = item.ratings[item.ratings.findIndex(rating => rating.provider_type === 'tomato:meter')];
    const imdbScore = imdbScoreObj && imdbScoreObj.value;
    const rtScore = rtScoreObj && rtScoreObj.value;
    

    return (
      <Fragment>
        <Header>
          <BackButton onClick={this.props.history.goBack} >
            <IconBack title="Back to previous page"/>
            Back
          </BackButton>
          <Title>
            <span>{item.title}</span>
            <YearSpan>
              {item.year ? `(${item.year})` : '(TBA)'}
            </YearSpan>
          </Title>
        </Header>
        <SingleWrapper>
          {item.poster ? 
            <img
              src = {`https://images.justwatch.com${item.poster}s276`}
              alt = {`poster preview for ${item.title}`}
            />
            :
            <EmptyImage>
              <IconImage title='No Image Icon' />
            </EmptyImage>
          }
          <InformationContainer>
            <InfoSection>
              <InfoUnit>
                <Label>Genres</Label>
                <GenresContainer>            
                    {/* Slice the array into only 3 genres for better UI */}
                    {item.genres.map(genre =>
                      <Genre key={genre}>
                        {getGenreName(genre, item.media_type)}
                      </Genre>
                    )}
                </GenresContainer>
              </InfoUnit>
              <InfoUnit>
                <Label>Runtime</Label>
                {convertedRuntime &&
                  <Runtime>
                    <IconClock title="Runtime"/>
                    {`${convertedRuntime.hours}h ${convertedRuntime.minutes}mins`}
                  </Runtime>
                }
              </InfoUnit>
            </InfoSection>
            <InfoSection>
              <InfoUnit>
                <Label>Synopsis</Label>
                <Synopsis>
                  {item.synopsis}
                </Synopsis>
              </InfoUnit>
            </InfoSection>
            <InfoSection>
              <InfoUnit>
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
                </MetaContainer>
              </InfoUnit>
            </InfoSection>            
          </InformationContainer>        
        </SingleWrapper>
      </Fragment>
    );
    }
    
  }

const mapStateToProps = ({ auth, single }) => {
  return {
    auth,
    single
  };
};

export default connect(mapStateToProps, {getTitle})(Single);