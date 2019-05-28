module Api
  class PostesController < ApplicationController
    def index
      @postes = Poste.all
    end
  end
end
