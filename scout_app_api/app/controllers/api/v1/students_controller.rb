class Api::V1::StudentsController < ApplicationController

def login
  student = Student.find_by(user_id: params[:user_id])
  if student&.authenticate(params[:password])
    render json: { success: true, student_id: student.id }
  else
    render json: { success: false }, status: :unauthorized
  end
end


  def index
    @students = Student.all  #Studentsモデルを全部取得(SELECT * FROM students)
    render json:@students #json形式でフロントに返す
  end

  def show
    @student = Student.find(params[:id]) #params[:id]で送られてきたIDを持つ生徒を探している
    render json:@student 
  end

  def create
    @student = Student.new(student_params) #.newは新しいインスタンス（データの元）を作る
        if @student.save #.saveはDBに保存するメソッド
            render json:@student, status: :created
        else
          render json:@student.errors,status: :unprocessable_entity
        end
  end

  def update
    @student = Student.find(params[:id])
    if @student.update(student_params)
      render json:@student, status: :ok
    else
        render json: @student.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @student = Student.find(params[:id])
    @student.destroy #受け取ったIDの生徒を探して、destroyメソッドでDBから削除
    head :no_content
  end

  private
  def student_params
    params.permit(:user_id, :password, :name, :appeal_point)
  end

end
