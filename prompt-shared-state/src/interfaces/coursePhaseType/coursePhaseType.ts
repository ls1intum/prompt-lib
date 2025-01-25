import { CoursePhaseTypeMetaDataItem } from './coursePhaseTypeMetaDataItem'

export interface CoursePhaseType {
  id: string
  name: string
  requiredInputMetaData: CoursePhaseTypeMetaDataItem[]
  providedOutputMetaData: CoursePhaseTypeMetaDataItem[]
  initialPhase: boolean
}
