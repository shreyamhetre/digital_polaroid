import { FILTERS } from '../../utils/filters.js'
import styles from './FilterPicker.module.css'

export default function FilterPicker({ photoUrl, selectedId, onSelect }) {
  return (
    <div className={styles.strip}>
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={filter.id === selectedId ? styles.itemActive : styles.item}
          onClick={() => onSelect(filter.id)}
        >
          <img src={photoUrl} alt="" className={styles.thumb} style={{ filter: filter.css }} />
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  )
}
