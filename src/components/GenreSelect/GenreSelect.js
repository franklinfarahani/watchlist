import Select from "react-select";
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables'; 

const GenreSelect = styled(Select)`
  flex: 1;
  
  .${props => props.classNamePrefix}__control {
    border: 0px;
    border-radius: 0;
    border-bottom: 2px solid ${colors.PRIMARY};
    background-color: transparent;
    box-shadow: none;

    &:hover {
      border-bottom: 2px solid ${colors.PRIMARY};
    }
    
    .${props => props.classNamePrefix}__value-container {
      padding: 2px 0;

      .${props => props.classNamePrefix}__placeholder {
        color: ${colors.subtitle.MEDIUM_LIGHT};
        font-size: 14px;
      }

      .${props => props.classNamePrefix}__multi-value {
        
        border-radius: 4px;
        padding: 2px 5px;
        margin-right: 6px;
        background: linear-gradient(to bottom, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);

        .${props => props.classNamePrefix}__multi-value__label {
          color: ${colors.WHITE};
          text-transform: uppercase;
          font-weight: 600;
          font-size: 9px;
          letter-spacing: .5px;
        }

        .${props => props.classNamePrefix}__multi-value__remove {
          color: ${colors.WHITE};
          width: 13px;
          padding: 0;

          &:hover {
            background-color: ${colors.BLACK + '45'};
          }
        }
      }
    }    	
	}

  .${props => props.classNamePrefix}__menu {
    .${props => props.classNamePrefix}__menu-list {

      background: ${colors.bg.DARK};
      border-radius: 4px;

      .${props => props.classNamePrefix}__option {
        color: ${colors.subtitle.MEDIUM}; 
        font-size: 14px;

        &.${props => props.classNamePrefix}__option--is-focused {
          color: ${colors.WHITE};
          background-color: ${colors.BLACK}
        }
      }
    }
  }

	&.Select-placeholder {
		font-size: smaller;
	}
`

export default GenreSelect;