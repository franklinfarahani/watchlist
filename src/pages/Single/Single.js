import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTitle } from '../../actions';
import { getGenreName, formatRuntime, isEmpty } from '../../utils'
import ListItemSkeleton from '../../components/Skeleton/ListItemSkeleton';

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
  margin-bottom: 15px;
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

const SingleWrapper = styled.section`
  background: ${colors.WHITE};
  display: flex;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  margin-left: 30px;
  & > img {
    border-radius: 4px;
    position: absolute;
    margin: -15px 0px 0px -30px;
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
  padding: 28px 30px 28px ${276}px;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`

const InfoUnit = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  align-content: flex-start;
  padding-right: 8px;
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
  font-size: 9.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
  line-height: 1.5;
  padding: 0px 5px;
  margin-bottom: 3px;
  margin-right: 3px;
  border-radius: 4px;
  color: ${colors.WHITE};  
  background: linear-gradient(to bottom, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
`

const Runtime = styled.span`
  color: ${colors.subtitle.MEDIUM};
  font-size: 12px;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 4px;
  font-weight: 400;
`

const Misc = styled.p`
  color: ${colors.BLACK};
  font-size: 14px;
`

const Synopsis = styled.p`
  color: ${colors.BLACK};
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
`

const RatingsContainer = styled.div`
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

const TrailersWrapper = styled.section`
  background: ${colors.WHITE};
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  iframe {
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }
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
    const { item, isLoading } = this.props.single;
    const { history } = this.props;
    if(isEmpty(item) || isLoading) {
      return (
      <Fragment>
        <Header>
          <BackButton onClick={history.goBack} >
            <IconBack title="Back to previous page"/>
            Back
          </BackButton>
          <Title>
            <span>Loading...</span>
          </Title>
        </Header>
        <ListItemSkeleton />
      </Fragment>
      )
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
          <BackButton onClick={history.goBack} >
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
              {convertedRuntime ?
                <InfoUnit>
                  <Label>Runtime</Label>                
                  <Runtime>
                    <IconClock title="Runtime"/>
                    {`${convertedRuntime.hours}h ${convertedRuntime.minutes}mins`}
                  </Runtime>                
                </InfoUnit> :
                <Fragment>
                  {item.seasons && 
                    <InfoUnit>
                      <Label>Seasons</Label>                
                      <Misc>{item.seasons}</Misc>                
                    </InfoUnit>
                  }
                </Fragment>
                                
              }
            </InfoSection>
            <InfoSection>
              <InfoUnit>
                <Label>Scores</Label>
                <RatingsContainer>
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
                </RatingsContainer>
              </InfoUnit>
              {item.age_rating &&
                <InfoUnit>
                  <Label>Age Rating</Label>
                  <Misc>{item.age_rating}</Misc>
                </InfoUnit>
              }
            </InfoSection>
            <InfoSection>
              <InfoUnit>
                <Label>Synopsis</Label>
                <Synopsis length={item.synopsis.length}>
                  {item.synopsis}
                </Synopsis>
              </InfoUnit>
            </InfoSection>            
          </InformationContainer>        
        </SingleWrapper>
        {item.clips && item.clips.length !== 0 &&
          <TrailersWrapper>
            {
              item.clips.slice(0,1).map(clip => {
                return (
                  <iframe
                    title={clip.name}
                    key={clip.external_id} 
                    width="720"
                    height="405"
                    src={`https://www.youtube.com/embed/${clip.external_id}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                  </iframe>
                )
              })
            }
          </TrailersWrapper>
        }
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