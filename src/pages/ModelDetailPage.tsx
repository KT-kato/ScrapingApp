import { useParams } from 'react-router'
import { Page } from '../components/layout/Page/Page'
import { ModelDetailContainer } from '../components/models/ModelDetail'
import styles from './ModelDetailPage.module.scss'

export const ModelDetailPage = () => {
  const { blandId, modelId } = useParams()

  if (!blandId || !modelId) {
    return (
      <Page>
        <div className={styles.errorContainer}>
          <h2>Error: Missing parameters</h2>
          <p>Brand ID and Model ID are required.</p>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <div className={styles.modelDetailPageContainer}>
        <ModelDetailContainer
          blandId={Number(blandId)}
          modelId={Number(modelId)}
        />
      </div>
    </Page>
  )
}
