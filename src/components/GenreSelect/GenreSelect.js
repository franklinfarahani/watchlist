import Select from "react-select";
import styled from 'styled-components';
import { colors, select } from '../../config/styleVariables'; 

const GenreSelect = styled(Select)`
  flex: 1;
  
  .${select}__control {
    border: 0px;
    border-radius: 0;
    border-bottom: 2px solid ${colors.PRIMARY};
    background-color: transparent;
    box-shadow: none;

    &:hover {
      border-bottom: 2px solid ${colors.PRIMARY};
    }
    
    .${select}__value-container {
      padding: 2px 0;
      cursor: text;

      .${select}__placeholder {
        color: ${colors.subtitle.MEDIUM_LIGHT};
        font-size: 14px;
      }

      .${select}__multi-value {
        
        border-radius: 4px;
        padding: 2px 5px;
        margin-right: 6px;
        background: linear-gradient(to bottom, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);

        .${select}__multi-value__label {
          color: ${colors.WHITE};
          text-transform: uppercase;
          font-weight: 600;
          font-size: 9px;
          letter-spacing: .5px;
        }

        .${select}__multi-value__remove {
          color: ${colors.WHITE};
          width: 13px;
          padding: 0;
          cursor: pointer;

          &:hover {
            background-color: ${colors.BLACK + '45'};
          }
        }
      }
    }    	
	}

  .${select}__menu {
    .${select}__menu-list {

      background: ${colors.bg.DARK};
      border-radius: 4px;

      .${select}__option {
        color: ${colors.subtitle.MEDIUM}; 
        font-size: 14px;

        &.${select}__option--is-focused {
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