namespace Baldur_s_Gate4
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
        }

        private async void Main_Load(object sender, EventArgs e)
        {
            await web.EnsureCoreWebView2Async(null);
            string path = Path.Combine(Environment.CurrentDirectory, "View", "index.html");
            web.CoreWebView2.Navigate(path);
        }
    }
}