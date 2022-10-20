using System.ComponentModel.DataAnnotations;

namespace restaurantApi.Models
{
    public class OrderDetails
    {
        [Key] public long OrderDetailId { get; set; }
        
        public long OrderMasterId { get; set; }

        public int FoodItemId { get; set; }

        public decimal FoodItemPrice { get; set; }
        
        public int Quantity { get; set; }
    }
}