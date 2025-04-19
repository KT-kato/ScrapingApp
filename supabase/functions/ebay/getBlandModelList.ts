import { corsHeaders, supabaseClient } from '../common/utils.ts'

type PathIds = {
  blandId: string | null
}

const getIdsFromPath = (path: string): PathIds => {
  const regex = /\/ebay\/bland\/([^/]+)\/models/
  const match = path.match(regex)

  if (match) {
    return {
      blandId: match[1] || null,
    }
  }
  return {
    blandId: null,
  }
}
// 特定のキーワードとカテゴリーのIDを元に、ebayの商品リストを取得する
export const getBlandModelList = async (req: Request) => {
  const pathIds = getIdsFromPath(req.url)
  if (!pathIds.blandId) {
    return new Response(
      JSON.stringify({
        error: 'Invalid path',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  }

  try {
    const data = await supabaseClient
      .from('item_model')
      .select('*')
      .eq('bland_id', pathIds.blandId)

    const responseData =
      data.data !== null
        ? data.data.map(item => {
            return {
              id: item.id,
              blandId: item.bland_id,
              blandModelName: item.bland_model_number,
            }
          })
        : []
    return new Response(
      JSON.stringify({
        modelList: responseData,
      }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  }
}
