require_relative '../model/legislator'

class LegislatorVoterExporter
  attr_reader :filename, :headers

  def initialize(filename: nil)
    @filename = filename || 'legislators-support-oppose-count.csv'
    @headers = %w[id name num_supported_bills num_opposed_bills]
  end

  def execute
    CSV.open(filename, 'wb', write_headers: true, headers: headers) do |csv|
      Legislator.all.each { |legislator| csv << convert_to_row(legislator) }
    end
  end

  private

  def convert_to_row(legislator)
    [legislator.id, legislator.name, legislator.supports.size, legislator.oppositions.size]
  end
end

LegislatorVoterExporter.new.execute