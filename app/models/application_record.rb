class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  class << self
    private
    def timestamp_attributes_for_create
      super << 'create_time'
    end

    def timestamp_attributes_for_update
      super << 'update_time'
    end
  end
end
