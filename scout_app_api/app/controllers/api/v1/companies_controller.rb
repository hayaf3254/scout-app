class Api::V1::CompaniesController < ApplicationController
#リクエストで送られてきたデータを受け取るためのハコ（ハッシュみたいなもの）
  def login
    company = Company.find_by(user_id: params[:user_id]) #params[:user_id] で送られてきたログインID
    if company && company.password == params[:password]
      render json: { success: true, company_id: company.id } #見つかったらsuccess: true
    else
      render json: { success: false }, status: :unauthorized #見つからなかったらsuccess:false,401 Unauthorized エラーを返す
    end
  end


  def index
    @companies = Company.all #Companyモデルを全部取得(SELECT * FROM companies)
    render json: @companies #json形式でフロントに返す
  end

  def show
    @company = Company.find(params[:id])
    render json: @company
  end

  def create
    @company = Company.new(company_params) #.newは新しいインスタンス（データの元）を作る
    if @company.save #.saveはDBに保存するメソッド
      render json: @company, status: :created #status → レスポンスの意味を伝えるためのHTTPステータスコード
    else
      render json: @company.errors, status: :unprocessable_entity #@company.errors → バリデーション失敗時のエラー情報（どの項目がどう悪いか）
    end
  end

  def update
    @company = Company.find(params[:id])
    if @company.update(company_params) #updataに成功したら true、失敗したら false
      render json: @company, status: :ok
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @company = Company.find(params[:id])
    @company.destroy #destroyはDBからデータ削除するメソッド
    head :no_content #「成功したけど返すデータは特にありません」っていう意味のレスポンス
  end

  private

  def company_params
    params.require(:company).permit(:user_id, :password, :name, :publish) #permit→許可するカラムを指定するメソッド
    # params.require(:company) → :companyキーの中身を取得（存在しなければエラー）
    # .permit(...) → 受け取ってもOKなキー（カラム）だけ許可
  end
end
