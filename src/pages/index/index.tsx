import styles from './styles/index.module.scss'
import CommonHeader from '../../components/common/header/CommonHeader'
import CommonSearchBar from '../../components/common/searchBar/CommonSearchBar'
import CommonNav from '../../components/common/navigation/CommonNav'
import CommonFooter from '../../components/common/footer/CommonFooter'
import Card from './component/card'
import DetailDialog from '../../components/common/dialog/DetailDialog'

import { useState } from 'react'
import { CardDTO } from './types/card'
import { useRecoilValue } from 'recoil'
import { imageData } from '../../recoil/selectors/imageSelectors'

function index() {
    const imgSelector = useRecoilValue(imageData)
    const [imgData, setImgData] = useState<CardDTO>()
    const [open, setOpen] = useState<boolean>(false)


    const CARD_LIST = imgSelector.data.results.map((card: CardDTO) =>{
        return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}></Card>
    })
    return (
      <div className={styles.page}>
          {/* 공통 헤더 UI */}
          <CommonHeader />
          {/* 공통 네비게이션 UI */}
          <CommonNav />
          <div className={styles.page__contents}>
              <div className={styles.page__contents__introBox}>
                  <div className={styles.wrapper}>
                      <span className={styles.wrapper__title}>PhotoSplash</span>
                      <span className={styles.wrapper__desc}>
                          인터넷의 시각 자료 출처입니다 <br />
                          모든 지역에 있는 크리에이터들의 지원을 받습니다.
                      </span>
                      <CommonSearchBar />
                  </div>
              </div>
              <div className={styles.page__contents__imageBox}>{CARD_LIST}</div>
          </div>
          {/* Footer */}
          <CommonFooter />
          {open && <DetailDialog data={imgData} handleDialog={setOpen}/>}
      </div>
    )
  }
  
  export default index