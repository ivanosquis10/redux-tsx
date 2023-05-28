import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'

// lo que hacemos aqui es renombrar los hooks que se utilizan para obtener la data y demas pero pasandole nuestros types creados
// esto lo que hara es que usemos nuestros propios hooks pero con los types y nombre que queremos, es una buena practica
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch