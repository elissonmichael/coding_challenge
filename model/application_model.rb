require 'csv'

class ApplicationModel
  def self.read(parser: CSV)
    parser.table("csv/#{filename}.csv")
  end

  def self.find(id)
    all.find { |resource| resource.id == id }
  end
end
